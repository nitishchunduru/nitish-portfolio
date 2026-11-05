import * as THREE from 'three';

const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

function label(text, base, ink) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = base; x.fillRect(0, 0, 256, 256);
  x.strokeStyle = ink; x.globalAlpha = .35; x.lineWidth = 5; x.strokeRect(14, 14, 228, 228); x.globalAlpha = 1;
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.font = `700 ${text.length > 5 ? 50 : 62}px Manrope, Arial, sans-serif`;
  x.fillText(text, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

function crate(size, color, text, ink, kit) {
  const side = kit.mat(new THREE.MeshStandardMaterial({ color, roughness: .55, metalness: .15 }));
  const mats = [side, side, side, side, side, side];
  if (text) {
    const map = kit.tex(label(text, color, ink));
    const face = kit.mat(new THREE.MeshStandardMaterial({ map, roughness: .55, metalness: .1 }));
    mats[4] = face; mats[0] = face;
  }
  const m = new THREE.Mesh(kit.geo(new THREE.BoxGeometry(size, size, size)), mats);
  return m;
}

function buildRack(root, o, kit, movers) {
  const frame = kit.mat(new THREE.MeshStandardMaterial({ color: o.accent, roughness: .4, metalness: .6 }));
  const deck = kit.mat(new THREE.MeshStandardMaterial({ color: o.steel, roughness: .7, metalness: .4 }));
  const W = 6.4, D = 1.7, levels = [-2.1, -.55, 1, 2.55], bays = 4, r = rng(71);
  const post = kit.geo(new THREE.BoxGeometry(.12, 6.6, .12));
  for (let i = 0; i <= bays; i++) for (const z of [-D / 2, D / 2]) {
    const p = new THREE.Mesh(post, frame); p.position.set(-W / 2 + i * W / bays, .05, z); root.add(p);
  }
  const shelf = kit.geo(new THREE.BoxGeometry(W + .2, .09, D + .1));
  levels.forEach(y => { const s = new THREE.Mesh(shelf, deck); s.position.y = y - .05; root.add(s); });
  let n = 0;
  levels.forEach((y, l) => {
    for (let b = 0; b < bays; b++) for (let k = 0; k < 2; k++) {
      if (r() > o.fill) continue;
      const size = .56 + r() * .2;
      const tinted = r() > .72;
      const c = crate(size, tinted ? o.accent : o.crate, r() > .35 ? o.codes[n++ % o.codes.length] : '', tinted ? '#ffffff' : o.ink, kit);
      const x = -W / 2 + (b + .28 + k * .44) * W / bays;
      c.position.set(x, y + size / 2, .25 - r() * .4);
      c.userData = { home: c.position.clone(), lag: l * .08 + b * .05 };
      root.add(c); movers.push(c);
    }
  });
  root.rotation.x = .1;
  return { scale: 1 };
}

function buildStack(root, o, kit, movers) {
  const r = rng(29); let n = 0;
  const size = 1.02, layers = Math.round(3 + o.fill * 3);
  for (let y = 0; y < layers; y++) {
    const span = layers - y;
    for (let a = 0; a < span; a++) for (let b = 0; b < span; b++) {
      if (y && r() > o.fill + .2) continue;
      const tinted = r() > .78;
      const c = crate(size * .95, tinted ? o.accent : o.crate, o.codes[n++ % o.codes.length], tinted ? '#ffffff' : o.ink, kit);
      c.position.set((a - (span - 1) / 2) * size, y * size - 2.4, (b - (span - 1) / 2) * size);
      c.userData = { home: c.position.clone(), lag: y * .06, burst: c.position.clone().multiply(new THREE.Vector3(.45, .12, .45)) };
      root.add(c); movers.push(c);
    }
  }
  root.rotation.x = .28;
  return { scale: .9 };
}

function buildFlow(root, o, kit, movers, tick) {
  const steps = ['PR', 'PO', 'GR', 'MIRO', 'GR/IR'], R = 2.9;
  const belt = new THREE.Mesh(kit.geo(new THREE.TorusGeometry(R, .08, 12, 90)), kit.mat(new THREE.MeshStandardMaterial({ color: o.accent, emissive: o.accent, emissiveIntensity: .35, roughness: .4 })));
  belt.rotation.x = Math.PI / 2; root.add(belt);
  steps.forEach((s, i) => {
    const a = i / steps.length * Math.PI * 2;
    const c = crate(1.45, i % 2 ? o.accent : o.crate, s, i % 2 ? '#ffffff' : o.ink, kit);
    c.position.set(Math.cos(a) * R, .15, Math.sin(a) * R);
    c.rotation.y = -a + Math.PI / 2;
    c.userData = { home: c.position.clone(), lag: i * .05 };
    root.add(c); movers.push(c);
  });
  const pack = Math.round(6 + o.fill * 12), g = kit.geo(new THREE.BoxGeometry(.24, .24, .24)), m = kit.mat(new THREE.MeshStandardMaterial({ color: o.ink, roughness: .4 }));
  const items = Array.from({ length: pack }, (_, i) => { const b = new THREE.Mesh(g, m); b.userData.a = i / pack * Math.PI * 2; root.add(b); return b; });
  tick.push(t => items.forEach(b => { const a = b.userData.a + t * .35; b.position.set(Math.cos(a) * R, .2, Math.sin(a) * R); b.rotation.y = -a; }));
  root.rotation.x = .5;
  return { scale: .95 };
}

export function createScene(canvas, options) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 60);
  camera.position.set(0, .4, 13.5);
  const root = new THREE.Group(); scene.add(root);
  const hemi = new THREE.HemisphereLight('#ffffff', '#222222', 1.3); scene.add(hemi);
  const key = new THREE.DirectionalLight('#ffffff', 2.4); key.position.set(4, 7, 8); scene.add(key);
  const rim = new THREE.DirectionalLight(options.accent, 5); rim.position.set(-7, 2, -5); scene.add(rim);

  let o = options, movers = [], tick = [], trash = [], fit = 1;
  const kit = { mat: x => (trash.push(x), x), geo: x => (trash.push(x), x), tex: x => (trash.push(x), x) };
  const clear = () => { root.clear(); trash.forEach(x => x.dispose()); trash = []; movers = []; tick = []; };
  const compose = () => {
    clear(); root.rotation.set(0, 0, 0);
    const make = { rack: buildRack, stack: buildStack, flow: buildFlow }[o.kind] || buildRack;
    fit = make(root, o, kit, movers, tick).scale;
    rim.color.set(o.accent);
  };
  compose();

  let visible = true, raf = 0, last = 0, spin = 0, scroll = 0, px = 0, py = 0, tx = 0, ty = 0, time = 0;
  const size = () => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.position.z = 13.5 / Math.min(1, w / h * 1.05) * (o.zoom || 1);
    camera.updateProjectionMatrix();
  };
  const draw = () => {
    px += (tx - px) * .06; py += (ty - py) * .06;
    root.scale.setScalar(fit);
    root.rotation.y = (o.kind === 'rack' ? Math.sin(spin * .5) * .5 - .42 : spin * .4) + px * .35;
    root.rotation.z = py * .04;
    for (const m of movers) {
      const u = m.userData, k = Math.max(0, Math.min(1, scroll * 2.2 - u.lag));
      m.position.copy(u.home);
      if (u.burst) m.position.addScaledVector(u.burst, k);
      else if (o.kind === 'rack') m.position.z += k * 1.3;
      else m.position.y += k * .6;
    }
    renderer.render(scene, camera);
  };
  const loop = now => {
    raf = requestAnimationFrame(loop);
    if (!visible) { last = now; return; }
    const dt = Math.min((now - last) / 1000 || 0, .05); last = now;
    spin += dt * o.speed; time += dt * o.speed;
    tick.forEach(f => f(time));
    draw();
  };
  const start = () => { cancelAnimationFrame(raf); raf = 0; size(); if (o.animate) raf = requestAnimationFrame(loop); else { spin = .6; tick.forEach(f => f(1)); draw(); } };
  const ro = new ResizeObserver(() => { size(); if (!o.animate) draw(); }); ro.observe(canvas);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(canvas);
  const onMove = e => { tx = (e.clientX / innerWidth - .5) * 2; ty = (e.clientY / innerHeight - .5) * 2; };
  window.addEventListener('pointermove', onMove, { passive: true });
  start();

  return {
    update(next) {
      const rebuild = ['kind', 'fill', 'accent', 'ink', 'crate', 'steel', 'codes'].some(k => String(next[k]) !== String(o[k]));
      o = next; if (rebuild) compose(); start();
    },
    scroll(v) { scroll = v; if (!o.animate) draw(); },
    dispose() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onMove); clear(); renderer.dispose(); },
  };
}
