// Stand-in pictures drawn from real resume facts. An uploaded image replaces each one.
const uri = svg => `data:image/svg+xml,${encodeURIComponent(svg)}`;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function projectArt(project, index, theme) {
  const { panel, accent, ink } = theme;
  const cells = Array.from({ length: 14 * 8 }, (_, i) => {
    const x = i % 14, y = Math.floor(i / 14), on = (x * 7 + y * 13 + index * 5) % 11 < 2;
    return `<rect x="${x * 58 + 2}" y="${y * 58 + 2}" width="52" height="52" fill="${on ? accent : ink}" opacity="${on ? 0.5 : 0.035}"/>`;
  }).join('');
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><rect width="800" height="480" fill="${panel}"/>${cells}<text x="36" y="436" font-family="Impact,Haettenschweiler,Arial Narrow Bold,sans-serif" font-size="104" fill="${ink}">${esc(project.code || project.title.slice(0, 8))}</text></svg>`);
}

const CATEGORIES = ['SPARES', 'PACKAGING', 'LABORATORY', 'INSTRUMENT.', 'IT', 'SAFETY', 'CONSUMABLES'];

export function beforeArt({ panel, ink, muted }) {
  const chips = Array.from({ length: 64 }, (_, i) => {
    const x = (i * 211) % 1120 + 20, y = (i * 137) % 590 + 20, w = 50 + (i * 53) % 90, r = ((i * 29) % 30) - 15;
    return `<rect x="${x}" y="${y}" width="${w}" height="20" fill="${i % 3 ? muted : ink}" opacity="${0.12 + ((i * 7) % 5) / 14}" transform="rotate(${r} ${x} ${y})"/>`;
  }).join('');
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 686"><rect width="1200" height="686" fill="${panel}"/>${chips}</svg>`);
}

export function afterArt({ bg, accent, ink }) {
  const cols = CATEGORIES.map((name, c) => {
    const x = 24 + c * 166;
    const rows = Array.from({ length: 13 }, (_, r) => `<rect x="${x}" y="${124 + r * 41}" width="150" height="30" fill="${accent}" opacity="${0.92 - r * 0.055}"/>`).join('');
    return `<text x="${x}" y="104" font-family="Arial,sans-serif" font-weight="700" font-size="17" fill="${ink}">${name}</text>${rows}`;
  }).join('');
  return uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 686"><rect width="1200" height="686" fill="${bg}"/>${cols}</svg>`);
}
