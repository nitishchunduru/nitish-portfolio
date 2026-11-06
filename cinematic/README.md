# Nitish Chunduru portfolio

A static one-page portfolio with an in-page admin panel and three.js scenes. It uses React, Framer Motion and esbuild, and needs no server.

## Run it

    npm install
    npm run build
    npm start        # http://localhost:4173

## Admin

Open the site with `#admin` at the end of the address, for example `http://localhost:4173/#admin`.

- **Images:** portrait, engagement images, before/after slider, client logos, certificates
- **Resume:** upload, replace or remove the PDF, and choose who can see and download it
- **Content:** every text, list and number, including company and GitHub projects
- **Theme:** five presets, custom colors, fonts, corners, film grain
- **Layout:** section order and visibility, hero media, work columns, spacing
- **3D:** scene choice, speed, stock level, card tilt
- **Backup:** export, import and reset

## Resume access

- **Everyone:** all visitors can open the resume on the page.
- **Access code:** the PDF is encrypted with AES-GCM before saving. Visitors need the code.
- **Nobody:** the Resume buttons disappear and the file is removed from the site on Save.
- **View only:** removes the Download button. Screenshots are still possible.

On a static host, also delete the PDF from `Asset/cv` and from the repo history if it must stay private. A file that stays in the folder keeps its direct address.

## Updating a static host

On GitHub Pages, Vercel or similar, Save keeps changes only in that browser. There is no login, so nobody else can change the public site this way. To publish:

1. Open **Admin > Backup > Export settings**.
2. Put `site-config.json` in this folder, next to `index.html`.
3. Commit and push.

## Files

- `src/defaults.js`: resume content and default settings
- `src/admin.jsx`: admin panel
- `src/storage.js`: loading and saving settings
- `src/scene3d.js`: 3D scenes
- `src/template.css`: template styles; `src/extra.css`: additions
- `index.html`: static entry; `artifact.html`: Claude artifact page body

The Vercel project for this repo may need its root directory set to `cinematic`, with `npm run build` as the build command and `.` as the output directory.
