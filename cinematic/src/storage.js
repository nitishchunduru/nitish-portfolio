import { merge } from './defaults.js';

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
    await artifact.publish({ 'site-config.json': { content: JSON.stringify(next), contentType: 'application/json' } });
    return { next, where: 'live' };
  } catch (e) {
    if (e?.code === 'capability_disabled') {
      try { await artifact.publish(shell(next)); return { next, where: 'live' }; } catch (e2) { e = e2; }
    }
    if (e?.code === 'conflict') return { next, error: 'A newer version was saved elsewhere, so this page is reloading to it.' };
    if (e?.code === 'too_large') return { next, error: 'The images are too large to save. Remove one or upload a smaller file.' };
    if (e?.code === 'not_writer' || e?.code === 'not_granted') return { next, error: 'You have view-only access to this page.' };
    return { next, error: 'Saving failed. Use Export to keep your changes, then try again.' };
  }
}

export async function saveFile(filename, data, type) {
  const downloads = await useCap('downloads');
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  if (downloads) {
    await downloads.save({ filename, data: blob }).catch(() => {});
    return;
  }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

export async function downloadCv(url) {
  const blob = await (await fetch(url)).blob();
  await saveFile('Nitish_Chunduru_SAP_MM_Consultant_Resume.pdf', blob, 'application/pdf');
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
