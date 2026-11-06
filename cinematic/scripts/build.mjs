import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';

// The template stylesheet stays intact apart from fixed colours, which become
// theme tokens so every Admin theme reaches every surface.
const mix = (a, pct, b = 'transparent') => `color-mix(in srgb,${a} ${pct}%,${b})`;
const swaps = {
  '#090909f5': mix('var(--bg)', 96), '#090909e8': mix('var(--bg)', 91), '#090909d9': mix('var(--bg)', 85), '#090909bb': mix('var(--bg)', 73),
  '#090909b8': mix('var(--bg)', 72), '#090909b3': mix('var(--bg)', 70), '#09090988': mix('var(--bg)', 53), '#09090977': mix('var(--bg)', 47), '#09090966': mix('var(--bg)', 40),
  '#101010': 'var(--panel)', '#111': 'var(--panel)', '#100c0c': 'var(--panel)', '#131010': 'var(--panel)', '#141414': 'var(--panel)', '#151212': 'var(--panel)', '#171111': 'var(--panel)',
  '#050505': 'var(--bg)', '#0e0a0a': 'var(--panel)', '#0c0a0a': 'var(--panel)', '#0a0909': 'var(--bg)',
  '#33262a': 'var(--line)', '#30282a': 'var(--line)', '#332326': 'var(--line)', '#2c2929': 'var(--line)', '#463236': 'var(--line)', '#493137': 'var(--line)', '#493438': 'var(--line)',
  '#b9b5b2': 'var(--muted)', '#c2bdb9': 'var(--muted)', '#ddd': 'var(--ink)', '#93878b': 'var(--muted)', '#9f9799': 'var(--muted)',
  '#272020': mix('var(--red)', 14), '#251216': mix('var(--red)', 14), '#ffffff65': mix('var(--ink)', 40), '#ffffff12': mix('var(--ink)', 7),
  '#ef4151': 'var(--red)', '#ca2032': 'var(--button-red)', '#c91c30': 'var(--button-red)', '#bc1a2b': 'var(--button-red)', '#bd0c22': 'var(--lettering)',
  '#ad1a2a': mix('var(--red)', 70, 'black'), '#6b1b24': mix('var(--red)', 45, 'var(--bg)'), '#87212b': mix('var(--red)', 55, 'var(--bg)'), '#5d202a': mix('var(--red)', 40, 'var(--bg)'),
  '#59111c': mix('var(--red)', 40, 'var(--bg)'), '#4c222a': mix('var(--red)', 30, 'var(--bg)'), '#a42434': 'var(--red)',
  '#8b0f1b': mix('var(--red)', 60, 'black'), '#41080f': mix('var(--red)', 28, 'black'), '#1b0d10': mix('var(--red)', 9, 'var(--bg)'),
  '#ef3848': '#fff', '#ff4255': '#fff', '#ffa4ac': mix('var(--red)', 35, 'white'), '#bf20302b': mix('white', 8), '#f5b6bb': mix('var(--red)', 35, 'white'), '#f8efed': 'var(--ink)',
};
let css = readFileSync('src/template.css', 'utf8');
for (const [from, to] of Object.entries(swaps)) css = css.replace(new RegExp(from + '(?![0-9a-fA-F])', 'gi'), to);
css = css.replace('--bg:#090909;--panel:var(--panel)', '--bg:#090909;--panel:#101010');
css = css.replace('--line:#292323', '--line:color-mix(in srgb,var(--ink) 13%,var(--bg))');
css = css.replace(':root{--red:var(--red);--button-red:var(--button-red)}', ':root{--button-red:color-mix(in srgb,var(--red) 82%,black);--lettering:color-mix(in srgb,var(--red) 80%,black)}');
css = css.replace('@charset "UTF-8";', '');
mkdirSync('Asset/dist', { recursive: true });
writeFileSync('src/.generated.css', css + '\n' + readFileSync('src/extra.css', 'utf8'));

const fonts = 'https://fonts.googleapis.com/css2?family=Anton&family=Archivo+Black&family=Bebas+Neue&family=Caveat:wght@400;500&family=DM+Sans:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Oswald:wght@500;700&display=swap';
const title = 'Nitish Chunduru';
const body = `<title>${title}</title>
<link rel="stylesheet" href="${fonts}">
<link rel="stylesheet" href="./Asset/dist/app.css">
<div id="root"></div>
<script src="./Asset/dist/app.js" defer></script>`;

await build({
  entryPoints: ['src/app.jsx'], bundle: true, minify: true, outfile: 'Asset/dist/app.js', loader: { '.jsx': 'jsx' }, jsx: 'automatic', target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"', __PAGE_BODY__: JSON.stringify(body) },
});

copyFileSync('node_modules/pdfjs-dist/build/pdf.worker.min.js', 'Asset/dist/pdf.worker.min.js');

const seo = {
  '@context': 'https://schema.org', '@type': 'Person', name: 'Nitish Chunduru', jobTitle: 'SAP MM Consultant',
  address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressRegion: 'Telangana', addressCountry: 'IN' },
  sameAs: ['https://github.com/nitishchunduru', 'https://linkedin.com/in/nitish-chunduru'],
  knowsAbout: ['SAP MM', 'SAP S/4HANA', 'Procure-to-Pay', 'Inventory Management', 'Material Master Data'],
};
// Static hosting entry point.
writeFileSync('index.html', `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#090909">
<meta name="description" content="Nitish Chunduru, SAP MM Consultant. SAP S/4HANA, Procure-to-Pay, inventory management and material master data.">
<meta property="og:type" content="profile">
<meta property="og:title" content="Nitish Chunduru | SAP MM Consultant">
<meta property="og:description" content="SAP S/4HANA, Procure-to-Pay, inventory management and material master data.">
<meta name="twitter:card" content="summary">
<link rel="icon" href="./Asset/img/favicon.svg" type="image/svg+xml">
<script type="application/ld+json">${JSON.stringify(seo)}</script>
${body.replace('<div id="root"></div>', '</head>\n<body>\n<div id="root"></div>')}
</body>
</html>
`);
// Published page body; the host adds its own document skeleton.
writeFileSync('artifact.html', body + '\n');
console.log('Built index.html, artifact.html and Asset/dist');
