import { merge, BUNDLED_RESUME } from './defaults.js';

const inViewer = () => typeof window.claude?.use === 'function';
const useCap = async name => { try { return inViewer() ? await window.claude.use(name) : null; } catch { return null; } };

function idb(mode, action) {
  return new Promise(resolve => {
    try {
      const open = indexedDB.open('nitish-portfolio', 1);
      open.onupgradeneeded = () => open.result.createObjectStore('kv');
      open.onerror = () => resolve(null);
      open.onsuccess = () => {
        const req = action(open.result.transaction('kv', mode).objectStore('kv'));
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => resolve(null);
      };
    } catch { resolve(null); }
  });
}

export async function loadConfig() {
  const found = [];
  const inline = document.getElementById('site-config');
  if (inline) { try { found.push(JSON.parse(inline.textContent)); } catch {} }
  try { const r = await fetch('./site-config.json', { cache: 'no-store' }); if (r.ok) found.push(await r.json()); } catch {}
  if (!inViewer()) { const local = await idb('readonly', s => s.get('config')); if (local) found.push(local); }
  found.sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
  return merge(found[0]);
}

export const canEditPage = async () => {
  if (!inViewer()) return location.hash === '#admin' ? 'local' : false;
  const user = await useCap('user');
  return (await user?.canEdit?.()) === true ? 'artifact' : false;
};

const shell = config => `<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}</style></head><body>${__PAGE_BODY__}<script id="site-config" type="application/json">${JSON.stringify(config).replace(/</g, '\\u003c')}</script></body></html>`;

export async function saveConfig(config) {
  const next = { ...config, savedAt: Date.now() };
  const artifact = await useCap('artifact');
  if (!artifact) {
    const ok = await idb('readwrite', s => s.put(next, 'config')) !== null;
    return ok ? { next, where: 'browser' } : { next, error: 'This browser blocked saving. Use Export to keep your changes.' };
  }
  try {
    const dropFile = next.resume.file !== BUNDLED_RESUME && !next.resume.bundledRemoved;
    if (dropFile) next.resume = { ...next.resume, bundledRemoved: true };
    const files = { 'site-config.json': { content: JSON.stringify(next), contentType: 'application/json' } };
    if (dropFile) files[BUNDLED_RESUME.slice(2)] = null;
    await artifact.publish(files);
    return { next, where: 'live' };
  } catch (e) {
    if (e?.code === 'capability_disabled') {
      try {
        const kept = next.resume.bundledRemoved && next.resume.file !== BUNDLED_RESUME;
        await artifact.publish(shell({ ...next, resume: { ...next.resume, bundledRemoved: false } }));
        return { next, where: 'live', warning: kept ? 'Saved, but the old resume file could not be deleted while the page is publicly shared. Stop public sharing, then save again.' : '' };
      } catch (e2) { e = e2; }
    }
    if (e?.code === 'conflict') return { next, error: 'A newer version was saved elsewhere, so this page is reloading to it.' };
    if (e?.code === 'too_large') return { next, error: 'The images are too large to save. Remove one or upload a smaller file.' };
    if (e?.code === 'not_writer' || e?.code === 'not_granted') return { next, error: 'You have view-only access to this page.' };
    return { next, error: 'Saving failed. Use Export to keep your changes, then try again.' };
  }
}

export async function saveFile(filename, data, type) {
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  if (inViewer()) {
    const downloads = await useCap('downloads');
    if (!downloads) return false;
    try { await downloads.save({ filename, data: blob }); return true; } catch { return false; }
  }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  return true;
}

export async function fileBytes(url) {
  if (url.startsWith('data:')) {
    const raw = atob(url.slice(url.indexOf(',') + 1));
    return Uint8Array.from(raw, c => c.charCodeAt(0));
  }
  const r = await fetch(url);
  if (!r.ok) throw new Error('missing');
  return new Uint8Array(await r.arrayBuffer());
}

const b64 = bytes => { let s = ''; for (let i = 0; i < bytes.length; i += 32768) s += String.fromCharCode(...bytes.subarray(i, i + 32768)); return btoa(s); };
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
export const toDataUrl = bytes => `data:application/pdf;base64,${b64(bytes)}`;
const keyFrom = async (code, salt) => crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' },
  await crypto.subtle.importKey('raw', new TextEncoder().encode(code), 'PBKDF2', false, ['deriveKey']),
  { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);

export async function lockResume(bytes, code) {
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await keyFrom(code, salt), bytes);
  return { salt: b64(salt), iv: b64(iv), data: b64(new Uint8Array(data)) };
}

export async function unlockResume(box, code) {
  const out = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(box.iv) }, await keyFrom(code, unb64(box.salt)), unb64(box.data));
  return new Uint8Array(out);
}

export function imageToDataUrl(file, maxEdge = 1500) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('That file could not be read.'));
    reader.onload = () => {
      if (file.type === 'image/svg+xml' || file.type === 'image/gif') return resolve(reader.result);
      const img = new Image();
      img.onerror = () => reject(new Error('That file is not a supported image.'));
      img.onload = () => {
        const k = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
        const c = document.createElement('canvas');
        c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        const webp = c.toDataURL('image/webp', .84);
        resolve(webp.startsWith('data:image/webp') ? webp : c.toDataURL('image/png'));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
