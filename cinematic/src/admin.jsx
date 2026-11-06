import React, { useState, useRef } from 'react';
import { X, Upload, Lock, Trash2, ArrowUp, ArrowDown, Plus, Eye, EyeOff, Undo2, Download, FileUp, Save } from 'lucide-react';
import { defaults, PRESETS, SECTION_LABELS, merge } from './defaults.js';
import { saveConfig, saveFile, imageToDataUrl, fileBytes, lockResume, unlockResume, toDataUrl } from './storage.js';

const get = (o, path) => path.split('.').reduce((a, k) => a?.[k], o);
const set = (o, path, value) => {
  const [head, ...rest] = path.split('.');
  const copy = Array.isArray(o) ? [...o] : { ...o };
  copy[head] = rest.length ? set(o[head], rest.join('.'), value) : value;
  return copy;
};
const TABS = ['Images', 'Resume', 'Content', 'Theme', 'Layout', '3D', 'Backup'];
const DISPLAY = ['Anton', 'Bebas Neue', 'Oswald', 'Archivo Black'];
const BODY = ['Manrope', 'IBM Plex Sans', 'DM Sans'];

function ImageField({ id, label, hint, value, onChange, maxEdge, onError }) {
  const input = useRef(null);
  const [over, setOver] = useState(false);
  const take = async file => {
    if (!file) return;
    if (!file.type.startsWith('image/')) return onError('Choose an image file: JPG, PNG, WebP or SVG.');
    try { onChange(await imageToDataUrl(file, maxEdge)); } catch (e) { onError(e.message); }
  };
  return <div className={`ad-image ${over ? 'over' : ''}`} onDragOver={e => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={e => { e.preventDefault(); setOver(false); take(e.dataTransfer.files[0]); }}>
    <div className="ad-thumb">{value ? <img src={value} alt="" /> : <Upload size={18} />}</div>
    <div className="ad-image-body">
      <strong>{label}</strong>{hint && <small>{hint}</small>}
      <div className="ad-row"><button type="button" className="ad-btn" onClick={() => input.current.click()}>{value ? 'Replace' : 'Upload'}</button>{value && <button type="button" className="ad-btn ghost" onClick={() => onChange('')}>Remove</button>}</div>
      <input id={`${id}-url`} className="ad-input" aria-label={`${label} image link`} placeholder="Or paste an image link" value={value?.startsWith('data:') ? '' : value || ''} onChange={e => onChange(e.target.value.trim())} />
    </div>
    <input id={id} ref={input} type="file" accept="image/*" hidden onChange={e => { take(e.target.files[0]); e.target.value = ''; }} />
  </div>;
}

function Text({ id, label, value, onChange, area }) {
  return <label className="ad-field" htmlFor={id}><span>{label}</span>{area ? <textarea id={id} className="ad-input" rows={String(value).length > 90 ? 4 : 2} value={value ?? ''} onChange={e => onChange(e.target.value)} /> : <input id={id} className="ad-input" value={value ?? ''} onChange={e => onChange(e.target.value)} />}</label>;
}

function Group({ title, open, children }) {
  return <details className="ad-group" open={open}><summary>{title}</summary><div>{children}</div></details>;
}

function ListEditor({ path, config, change, fields, blank, itemLabel }) {
  const items = get(config, path);
  const put = next => change(path, next);
  return <>{items.map((item, i) => <details className="ad-item" key={item.id || i}><summary>{itemLabel(item) || 'New item'}</summary>
    {fields.map(([key, label, area]) => <Text key={key} id={`${path}-${i}-${key}`} label={label} area={area} value={item[key]} onChange={v => put(items.map((x, n) => n === i ? { ...x, [key]: v } : x))} />)}
    {'featured' in item && <label className="ad-check" htmlFor={`${path}-${i}-featured`}><input id={`${path}-${i}-featured`} type="checkbox" checked={item.featured} onChange={e => put(items.map((x, n) => n === i ? { ...x, featured: e.target.checked } : x))} />Show on the first view</label>}
    <div className="ad-row">
      <button type="button" className="ad-icon" aria-label="Move up" disabled={!i} onClick={() => { const n = [...items]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; put(n); }}><ArrowUp size={14} /></button>
      <button type="button" className="ad-icon" aria-label="Move down" disabled={i === items.length - 1} onClick={() => { const n = [...items]; [n[i + 1], n[i]] = [n[i], n[i + 1]]; put(n); }}><ArrowDown size={14} /></button>
      <button type="button" className="ad-btn ghost" onClick={() => put(items.filter((_, n) => n !== i))}><Trash2 size={13} /> Delete</button>
    </div>
  </details>)}<button type="button" className="ad-btn ghost wide" onClick={() => put([...items, { ...blank, id: blank.title !== undefined && 'category' in blank ? `p${Date.now()}` : undefined }])}><Plus size={14} /> Add</button></>;
}

export function Admin({ config, setConfig, saved, setSaved, mode, onClose }) {
  const [tab, setTab] = useState('Images');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const importer = useRef(null), cvInput = useRef(null);
  const [code, setCode] = useState('');
  const [confirmRemove, setConfirmRemove] = useState(false);
  const resume = config.resume;
  const setResume = patch => { setConfig(c => ({ ...c, resume: { ...c.resume, ...patch } })); setStatus(''); };
  const change = (path, value) => { setConfig(c => set(c, path, value)); setStatus(''); };
  const bind = (path, label, area) => <Text key={path} id={`f-${path}`} label={label} area={area} value={get(config, path)} onChange={v => change(path, v)} />;
  const dirty = JSON.stringify(config) !== JSON.stringify(saved);
  const size = new Blob([JSON.stringify(config)]).size / 1048576;
  const { theme, layout, scene } = config;
  const preset = key => { const { label, ...p } = PRESETS[key]; setConfig(c => ({ ...c, theme: { ...c.theme, ...p, preset: key } })); };
  const color = (key, label) => <label className="ad-color" htmlFor={`c-${key}`} key={key}><input id={`c-${key}`} type="color" value={theme[key]} onChange={e => setConfig(c => ({ ...c, theme: { ...c.theme, [key]: e.target.value, preset: '' } }))} /><span>{label}</span><code>{theme[key]}</code></label>;
  const choice = (path, options) => <div className="ad-segment" role="group">{options.map(([value, label]) => <button type="button" key={value} className={get(config, path) === value ? 'on' : ''} aria-pressed={get(config, path) === value} onClick={() => change(path, value)}>{label}</button>)}</div>;
  const toggle = (path, label) => <label className="ad-check" htmlFor={`t-${path}`}><input id={`t-${path}`} type="checkbox" checked={!!get(config, path)} onChange={e => change(path, e.target.checked)} />{label}</label>;
  const move = (i, d) => { const o = [...layout.order]; [o[i], o[i + d]] = [o[i + d], o[i]]; change('layout.order', o); };
  const hide = id => change('layout.hidden', layout.hidden.includes(id) ? layout.hidden.filter(x => x !== id) : [...layout.hidden, id]);
  const save = async () => {
    setBusy(true); setStatus('Saving…');
    let draft = config;
    try {
      if (resume.access === 'private') draft = { ...draft, resume: { ...resume, file: '', encrypted: null } };
      if (resume.access === 'public' && !resume.file) throw new Error(resume.encrypted ? 'Enter your access code and press Unlock, or upload the resume again.' : 'Upload a resume first, or choose Nobody.');
      if (resume.access === 'code' && resume.file) {
        if (code.length < 6) throw new Error('Enter an access code of at least 6 characters.');
        draft = { ...draft, resume: { ...resume, file: '', encrypted: await lockResume(await fileBytes(resume.file), code) } };
      } else if (resume.access === 'code' && !resume.encrypted) throw new Error('Upload a resume first.');
    } catch (e) { setBusy(false); return setStatus(e.message === 'missing' ? 'The resume file is missing. Upload it again.' : e.message); }
    const r = await saveConfig(draft);
    setBusy(false);
    if (r.error) return setStatus(r.error);
    setConfig(r.next); setSaved(r.next); setCode('');
    setStatus(r.warning || (r.where === 'live' ? 'Saved. Everyone now sees this version.' : 'Saved in this browser. Export the file to update the live site.'));
  };
  const importFile = async file => {
    try { setConfig(merge(JSON.parse(await file.text()))); setStatus('Imported. Press Save to keep it.'); }
    catch { setStatus('That file is not a portfolio settings file.'); }
  };
  const cvUpload = file => {
    if (!file) return;
    if (file.type !== 'application/pdf') return setStatus('Choose a PDF file.');
    if (file.size > 6 * 1048576) return setStatus('Choose a PDF under 6 MB.');
    const r = new FileReader();
    r.onload = () => { setResume({ file: r.result, encrypted: null, name: file.name, updated: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }), access: resume.access === 'private' ? 'public' : resume.access }); setStatus('Resume ready. Press Save to publish it.'); };
    r.readAsDataURL(file);
  };
  const unlock = async () => {
    try { setResume({ file: toDataUrl(await unlockResume(resume.encrypted, code)), encrypted: null }); setCode(''); setStatus('Unlocked. Choose who can see it, then press Save.'); }
    catch { setStatus('That access code is not correct.'); }
  };
  const imageProps = { onError: setStatus };
  return <aside className="admin" role="dialog" aria-label="Portfolio admin settings">
    <div className="ad-head"><div><strong>Admin settings</strong><small>{mode === 'artifact' ? 'Only you and your editors see this panel.' : 'Changes stay in this browser until you export them.'}</small></div><button className="ad-icon" onClick={onClose} aria-label="Close admin"><X size={17} /></button></div>
    <div className="ad-tabs" role="tablist">{TABS.map(t => <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}</button>)}</div>
    <div className="ad-body">
      {tab === 'Images' && <>
        <ImageField id="img-portrait" label="Hero portrait" hint="A transparent PNG looks best. It stands in front of the 3D scene." value={config.images.portrait} onChange={v => change('images.portrait', v)} {...imageProps} />
        <Group title="Engagement images" open>{config.projects.map((p, i) => <ImageField key={p.id || i} id={`img-p-${i}`} label={p.title} value={p.image} onChange={v => change('projects', config.projects.map((x, n) => n === i ? { ...x, image: v } : x))} {...imageProps} />)}</Group>
        <Group title="Company project images">{config.company.map((p, i) => <ImageField key={p.id || i} id={`img-co-${i}`} label={p.title} hint="Without an image, the logo appears." value={p.image} onChange={v => change('company', config.company.map((x, n) => n === i ? { ...x, image: v } : x))} {...imageProps} />)}</Group>
        <Group title="Before and after slider"><ImageField id="img-before" label="Before" value={config.images.before} onChange={v => change('images.before', v)} {...imageProps} /><ImageField id="img-after" label="After" value={config.images.after} onChange={v => change('images.after', v)} {...imageProps} /></Group>
        <Group title="Client logos">{config.brands.map((b, i) => <ImageField key={i} id={`img-b-${i}`} label={b.name} hint="Without a logo, the name appears as text." maxEdge={500} value={b.image} onChange={v => change('brands', config.brands.map((x, n) => n === i ? { ...x, image: v } : x))} {...imageProps} />)}</Group>
        <Group title="Course certificates">{config.courses.map((c, i) => <ImageField key={i} id={`img-c-${i}`} label={c.title} value={c.image} onChange={v => change('courses', config.courses.map((x, n) => n === i ? { ...x, image: v } : x))} {...imageProps} />)}</Group>
      </>}
      {tab === 'Resume' && <>
        <div className="ad-resume"><strong>{resume.access === 'private' || (!resume.file && !resume.encrypted) ? 'No resume on the site' : resume.name}</strong>{resume.updated && (resume.file || resume.encrypted) && <small>Updated {resume.updated}</small>}{resume.encrypted && <small><Lock size={12} /> Locked with an access code</small>}</div>
        <div className="ad-row"><button type="button" className="ad-btn" onClick={() => cvInput.current.click()}><FileUp size={14} /> {resume.file || resume.encrypted ? 'Replace resume' : 'Upload resume'}</button>
          {(resume.file || resume.encrypted) && (confirmRemove ? <><button type="button" className="ad-btn danger" onClick={() => { setResume({ file: '', encrypted: null, access: 'private' }); setConfirmRemove(false); setStatus('Resume removed. Press Save to publish this.'); }}>Yes, remove</button><button type="button" className="ad-btn ghost" onClick={() => setConfirmRemove(false)}>Cancel</button></> : <button type="button" className="ad-btn ghost" onClick={() => setConfirmRemove(true)}><Trash2 size={13} /> Remove</button>)}
          <input id="cv-file" ref={cvInput} type="file" accept="application/pdf" hidden onChange={e => { cvUpload(e.target.files[0]); e.target.value = ''; }} /></div>
        <h4>Who can see it</h4>{choice('resume.access', [['public', 'Everyone'], ['code', 'Access code'], ['private', 'Nobody']])}
        <p className="ad-note">{resume.access === 'public' ? 'Every visitor sees the Resume button and can open it on the page.' : resume.access === 'code' ? 'The resume is encrypted. Visitors need the code you give them, and the buttons say Resume on request.' : 'All Resume buttons disappear and the file is taken off the site when you press Save. Keep your own copy. Upload it again to bring it back.'}</p>
        {resume.access === 'code' && resume.file && <Text id="resume-code" label="Access code, at least 6 characters" value={code} onChange={setCode} />}
        {resume.encrypted && <><Text id="resume-code" label="Current access code" value={code} onChange={setCode} /><button type="button" className="ad-btn ghost" onClick={unlock}>Unlock to change settings</button></>}
        {resume.access !== 'private' && <><h4>Who can download it</h4>{choice('resume.download', [[true, 'Anyone who can see it'], [false, 'Nobody, view only']])}
          {!resume.download && <p className="ad-note">This removes the Download button. A determined person could still take a screenshot of the resume.</p>}</>}
        {mode === 'local' && <p className="ad-note">On a static host, also delete the PDF from Asset/cv before you publish. Otherwise its direct address still works.</p>}
      </>}
      {tab === 'Content' && <>
        <Group title="Hero" open>{bind('hero.wordmark', 'Header name')}{bind('hero.lettering', 'Giant background word')}{bind('hero.greeting', 'Greeting')}{bind('hero.name', 'Name')}{bind('hero.roleLines', 'Role', true)}{bind('hero.intro', 'Intro', true)}{bind('hero.location', 'Location')}{bind('hero.badge', 'Top right label')}{bind('hero.manifesto', 'Side line', true)}</Group>
        <Group title="Hero numbers"><ListEditor path="stats" config={config} change={change} blank={{ value: '', suffix: '', label: '' }} itemLabel={x => `${x.value}${x.suffix}`} fields={[['value', 'Number'], ['suffix', 'Suffix'], ['label', 'Label', true]]} /></Group>
        <Group title="Engagements"><ListEditor path="projects" config={config} change={change} blank={{ title: 'New engagement', category: 'Migration', year: '', role: '', code: '', featured: false, image: '', link: '', description: '', points: '' }} itemLabel={x => x.title} fields={[['title', 'Title'], ['category', 'Category'], ['year', 'Year'], ['role', 'Role'], ['code', 'Card label'], ['description', 'Description', true], ['points', 'Bullet points, one per line', true], ['link', 'Link']]} /></Group>
        <Group title="Company projects"><ListEditor path="company" config={config} change={change} blank={{ title: 'New project', category: 'Company', year: '', role: '', code: '', logo: '', image: '', description: '', points: '', tags: '', link: '', linkLabel: 'Visit live site', repo: '' }} itemLabel={x => x.title} fields={[['title', 'Title'], ['category', 'Category'], ['year', 'Year'], ['role', 'Role'], ['description', 'Description', true], ['points', 'Bullet points, one per line', true], ['tags', 'Tags, separated by commas'], ['link', 'Live site link'], ['linkLabel', 'Live site button text'], ['repo', 'Public code link']]} /></Group>
        <Group title="Planned ventures"><ListEditor path="planned" config={config} change={change} blank={{ name: 'New venture', stage: 'Planned', text: '', logo: '' }} itemLabel={x => x.name} fields={[['name', 'Name'], ['stage', 'Stage'], ['text', 'Detail', true]]} /></Group>
        <Group title="GitHub projects"><ListEditor path="code" config={config} change={change} blank={{ title: 'New repo', text: '', tags: '', url: '' }} itemLabel={x => x.title} fields={[['title', 'Title'], ['text', 'Detail', true], ['tags', 'Tags'], ['url', 'Public repo link']]} /></Group>
        <Group title="Client names"><ListEditor path="brands" config={config} change={change} blank={{ name: 'New client', image: '' }} itemLabel={x => x.name} fields={[['name', 'Name']]} /></Group>
        <Group title="Impact numbers"><ListEditor path="impact" config={config} change={change} blank={{ value: '', title: 'New result', event: '' }} itemLabel={x => `${x.value} ${x.title}`} fields={[['value', 'Number'], ['title', 'Title'], ['event', 'Detail']]} /></Group>
        <Group title="Profile">{bind('about', 'About', true)}<Text id="f-skills" label="Skills, one per line" area value={config.skills.join('\n')} onChange={v => change('skills', v.split('\n'))} /><Text id="f-tcodes" label="T-codes, one per line" area value={config.tcodes.join('\n')} onChange={v => change('tcodes', v.split('\n'))} /></Group>
        <Group title="Education"><ListEditor path="education" config={config} change={change} blank={{ title: 'New entry', meta: '', text: '' }} itemLabel={x => x.title} fields={[['title', 'Title'], ['meta', 'Dates'], ['text', 'Detail', true]]} /></Group>
        <Group title="Process steps"><ListEditor path="process" config={config} change={change} blank={{ title: 'NEW STEP', text: '' }} itemLabel={x => x.title} fields={[['title', 'Title'], ['text', 'Detail', true]]} /></Group>
        <Group title="Experience"><ListEditor path="experience" config={config} change={change} blank={{ date: '', title: 'New role', place: '', text: '' }} itemLabel={x => x.title} fields={[['date', 'Dates'], ['title', 'Title'], ['place', 'Place'], ['text', 'Detail', true]]} /></Group>
        <Group title="Courses"><ListEditor path="courses" config={config} change={change} blank={{ title: 'New course', image: '' }} itemLabel={x => x.title} fields={[['title', 'Course name']]} /></Group>
        <Group title="Contact">{bind('contact.email', 'Email')}{bind('contact.phone', 'Phone')}{bind('contact.linkedin', 'LinkedIn link')}{bind('contact.linkedinLabel', 'LinkedIn text')}{bind('contact.github', 'GitHub link')}{bind('contact.githubLabel', 'GitHub text')}{bind('contact.location', 'Location')}</Group>
        <Group title="Section headings">{Object.keys(defaults.headings).map(k => bind(`headings.${k}`, k.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()), get(config, `headings.${k}`).length > 60 || get(config, `headings.${k}`).includes('\n')))}</Group>
      </>}
      {tab === 'Theme' && <>
        <h4>Theme</h4><div className="ad-presets">{Object.entries(PRESETS).map(([key, p]) => <button type="button" key={key} className={theme.preset === key ? 'on' : ''} aria-pressed={theme.preset === key} onClick={() => preset(key)}><i style={{ background: p.bg }}><b style={{ background: p.accent }} /></i>{p.label}</button>)}</div>
        <h4>Colors</h4>{color('accent', 'Accent')}{color('bg', 'Background')}{color('panel', 'Panels')}{color('ink', 'Text')}{color('muted', 'Quiet text')}
        <h4>Display font</h4>{choice('theme.display', DISPLAY.map(f => [f, f]))}
        <h4>Body font</h4>{choice('theme.body', BODY.map(f => [f, f]))}
        <h4>Corners</h4>{choice('theme.corners', [['square', 'Square'], ['soft', 'Soft']])}
        <div className="ad-gap">{toggle('theme.grain', 'Film grain overlay')}</div>
      </>}
      {tab === 'Layout' && <>
        <h4>Sections</h4><p className="ad-note">Reorder sections or hide them. The menu follows.</p>
        {layout.order.map((id, i) => { const off = layout.hidden.includes(id); return <div className={`ad-section ${off ? 'off' : ''}`} key={id}><span>{SECTION_LABELS[id]}</span><button type="button" className="ad-icon" aria-label={`Move ${SECTION_LABELS[id]} up`} disabled={!i} onClick={() => move(i, -1)}><ArrowUp size={14} /></button><button type="button" className="ad-icon" aria-label={`Move ${SECTION_LABELS[id]} down`} disabled={i === layout.order.length - 1} onClick={() => move(i, 1)}><ArrowDown size={14} /></button><button type="button" className="ad-icon" aria-label={`${off ? 'Show' : 'Hide'} ${SECTION_LABELS[id]}`} aria-pressed={off} onClick={() => hide(id)}>{off ? <EyeOff size={14} /> : <Eye size={14} />}</button></div>; })}
        <h4>Hero shows</h4>{choice('layout.heroMedia', [['both', 'Portrait + 3D'], ['3d', '3D only'], ['portrait', 'Portrait only']])}
        <h4>Work columns</h4>{choice('layout.columns', [[2, '2'], [3, '3'], [4, '4']])}
        <h4>Spacing</h4>{choice('layout.density', [['compact', 'Compact'], ['regular', 'Regular'], ['spacious', 'Spacious']])}
      </>}
      {tab === '3D' && <>
        <div className="ad-gap">{toggle('scene.enabled', 'Show 3D scenes')}</div>
        <h4>Hero scene</h4>{choice('scene.kind', [['rack', 'Storage rack'], ['stack', 'Crate stack'], ['flow', 'P2P loop']])}
        <label className="ad-field" htmlFor="scene-speed"><span>Rotation speed: {scene.speed.toFixed(1)}</span><input id="scene-speed" type="range" min="0" max="3" step=".1" value={scene.speed} onChange={e => change('scene.speed', Number(e.target.value))} /></label>
        <label className="ad-field" htmlFor="scene-fill"><span>Stock level: {Math.round(scene.fill * 100)}%</span><input id="scene-fill" type="range" min=".2" max="1" step=".05" value={scene.fill} onChange={e => change('scene.fill', Number(e.target.value))} /></label>
        <div className="ad-gap">{toggle('scene.tilt', '3D tilt on work cards')}{toggle('scene.contact', '3D P2P loop in Contact')}</div>
        <p className="ad-note">The crates are labelled with your T-codes from the Content tab.</p>
      </>}
      {tab === 'Backup' && <>
        <h4>Move or back up your settings</h4>
        <p className="ad-note">The file holds all your text, theme, layout and images. {mode === 'local' && 'To update the live site, add it to the project folder as site-config.json.'}</p>
        <div className="ad-stack"><button type="button" className="ad-btn" onClick={async () => { if (!await saveFile('site-config.json', JSON.stringify(config, null, 1), 'application/json')) setStatus('Download is not available in this view.'); }}><Download size={14} /> Export settings</button>
          <button type="button" className="ad-btn" onClick={() => importer.current.click()}><FileUp size={14} /> Import settings</button>
          <input id="import-file" ref={importer} type="file" accept="application/json,.json" hidden onChange={e => { if (e.target.files[0]) importFile(e.target.files[0]); e.target.value = ''; }} />
          {confirmReset ? <div className="ad-row"><button type="button" className="ad-btn danger" onClick={() => { setConfig({ ...defaults, resume: config.resume }); setConfirmReset(false); setStatus('Reset to defaults. Your resume settings are unchanged. Press Save to keep it.'); }}>Yes, reset everything</button><button type="button" className="ad-btn ghost" onClick={() => setConfirmReset(false)}>Cancel</button></div> : <button type="button" className="ad-btn ghost" onClick={() => setConfirmReset(true)}><Undo2 size={14} /> Reset to resume defaults</button>}</div>
        <p className="ad-note">Settings size: {size.toFixed(2)} MB of 15 MB</p>
      </>}
    </div>
    <div className="ad-foot"><p role="status">{status || (dirty ? 'You have unsaved changes.' : 'All changes saved.')}</p><div className="ad-row"><button type="button" className="ad-btn ghost" disabled={!dirty || busy} onClick={() => { setConfig(saved); setStatus(''); }}>Discard</button><button type="button" className="ad-btn solid" disabled={!dirty || busy || size > 15} onClick={save}><Save size={14} /> Save</button></div></div>
  </aside>;
}
