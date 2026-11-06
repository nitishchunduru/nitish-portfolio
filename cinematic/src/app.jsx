import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence, MotionConfig, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion, useMotionValueEvent, useAnimationFrame, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowDown, ArrowRight, Play, X, Menu, Mail, Phone, MapPin, Linkedin, Download, Pause, Search, Plus, Minus, ChevronLeft, ChevronRight, ExternalLink, Settings2, Copy, Github, Lock, FileText } from 'lucide-react';
import './.generated.css';
import { defaults, SECTION_LABELS } from './defaults.js';
import { loadConfig, canEditPage } from './storage.js';
import { ResumeDialog, resumeOpen } from './resume.jsx';
import { createScene } from './scene3d.js';
import { projectArt, beforeArt, afterArt } from './art.js';
import { Admin } from './admin.jsx';

const MotionContext = createContext(true);
const Config = createContext(defaults);
const ResumeAction = createContext(() => {});
const useConfig = () => useContext(Config);
const EASE = [0.22, 1, 0.36, 1];
const lines = (s = '') => String(s).split('\n').map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}{l}</React.Fragment>);
const mix = (a, b, t) => {
  const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
const NAV = { portfolio: 'Work', company: 'Company', awards: 'Impact', about: 'Profile', experience: 'Experience', contact: 'Contact' };

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const enabled = useContext(MotionContext);
  const Component = motion[as];
  return <Component className={className} initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.12 }} transition={{ duration: enabled ? 0.75 : 0, delay, ease: EASE }}>{children}</Component>;
}

function MediaImage({ src, alt, className = '', ...props }) {
  return <span className={`media-image loaded ${className}`}><img src={src} alt={alt} loading="lazy" width="960" height="600" {...props} /></span>;
}

function Magnetic({ children, className = '', ...props }) {
  const enabled = useContext(MotionContext);
  const x = useSpring(0, { stiffness: 220, damping: 20 });
  const y = useSpring(0, { stiffness: 220, damping: 20 });
  return <motion.a className={className} style={{ x, y }} onPointerMove={e => {
    if (!enabled || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.12); y.set((e.clientY - r.top - r.height / 2) * 0.2);
  }} onPointerLeave={() => { x.set(0); y.set(0); }} {...props}>{children}</motion.a>;
}

function Scene({ kind, className, zoom, progress }) {
  const cfg = useConfig();
  const enabled = useContext(MotionContext);
  const ref = useRef(null), scene = useRef(null);
  const { theme, scene: s } = cfg;
  const options = { kind, zoom, speed: s.speed, fill: s.fill, animate: enabled && s.speed > 0, accent: theme.accent, ink: theme.ink, crate: mix(theme.panel, theme.ink, .16), steel: mix(theme.panel, theme.ink, .3), codes: cfg.tcodes.length ? cfg.tcodes : ['MM'] };
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    scene.current = createScene(ref.current, options);
    if (!scene.current) setFailed(true);
    return () => { scene.current?.dispose(); scene.current = null; };
  }, []);
  useEffect(() => { scene.current?.update(options); }, [JSON.stringify(options)]);
  useEffect(() => progress?.on('change', v => scene.current?.scroll(v)), [progress]);
  if (failed) return null;
  return <canvas ref={ref} className={`scene-canvas ${className || ''}`} aria-hidden="true" />;
}

function Header({ enabled, onToggle, sections, admin, onAdmin }) {
  const { hero } = useConfig();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const links = sections.filter(id => NAV[id]).map(id => [id, NAV[id]]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [sections.join()]);
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, []);
  return <header className="site-header">
    <a className="wordmark" href="#home" aria-label={`${hero.wordmark}, home`}>{hero.wordmark}<span>®</span></a>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>{label}</a>)}</nav>
    <div className="header-actions">
      {admin && <button className="admin-open" onClick={onAdmin}><Settings2 size={15} /><span>Admin</span></button>}
      <button className="motion-toggle" onClick={onToggle} aria-label={enabled ? 'Pause animation' : 'Turn animation on'} aria-pressed={!enabled}>{enabled ? <Pause size={13} /> : <Play size={13} />}<span>Motion {enabled ? 'on' : 'off'}</span></button>
      {sections.includes('contact') && <a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>}
      <button className="menu-toggle icon-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{[['home', 'Home'], ...links].map(([id, label], i) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight size={18} /></a>)}</motion.nav>}</AnimatePresence>
  </header>;
}

function Hero({ onProject, sections }) {
  const cfg = useConfig();
  const { hero, stats, images, layout, scene, projects } = cfg;
  const openResume = useContext(ResumeAction);
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 85]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const show3d = scene.enabled && (layout.heroMedia !== 'portrait' || !images.portrait);
  const showPortrait = images.portrait && layout.heroMedia !== '3d';
  return <section id="home" className="hero" ref={ref}>
    <div className="hero-top"><span>{hero.toplineA}<br /><span className="muted">{hero.toplineB}</span></span><span className="availability"><i />{hero.badge}</span></div>
    <motion.div className="hero-title display" aria-hidden="true" style={enabled ? { y: titleY } : {}} initial={enabled ? { clipPath: 'inset(0 0 100% 0)' } : false} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.4, ease: EASE }}>{hero.lettering}</motion.div>
    {show3d && <div className={`hero-scene ${showPortrait ? 'behind' : ''}`}><Scene kind={scene.kind} progress={scrollYProgress} /></div>}
    {showPortrait && <motion.div className="hero-portrait" style={enabled ? { y: portraitY, scale: portraitScale } : {}} initial={enabled ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}><img src={images.portrait} alt={`Portrait of ${hero.name}`} width="1024" height="1536" /></motion.div>}
    <motion.div className="hero-intro" style={enabled ? { y: copyY } : {}} initial={enabled ? { opacity: 0, x: -35 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.35, ease: EASE }}>
      <p className="handwriting">{hero.greeting}</p><h1 className="display">{hero.name}<span>.</span></h1><p className="hero-role">{lines(hero.roleLines)}</p><p className="hero-description">{hero.intro}</p>
      {sections.includes('portfolio') && <Magnetic href="#portfolio" className="primary-link">{hero.cta} <ArrowDown size={17} /></Magnetic>}
      <span className="hero-location"><MapPin size={12} /> {hero.location}</span>
    </motion.div>
    <motion.div className="hero-side" initial={enabled ? { opacity: 0, x: 30 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.55, ease: EASE }}>
      <div className="hero-manifesto"><span className="crosshair" aria-hidden="true">✳</span><p>{lines(hero.manifesto)}</p></div>
      <div className="hero-stats">{stats.map((s, i) => <div key={i}><span className="display">{s.value}<span>{s.suffix}</span></span><p>{lines(s.label)}</p></div>)}{resumeOpen(cfg.resume) && <button type="button" className="hero-link" onClick={openResume}>{cfg.resume.access === 'code' ? <Lock size={16} /> : <FileText size={16} />}<span>{cfg.resume.access === 'code' ? 'RESUME ON REQUEST' : 'VIEW RESUME'}</span></button>}<a className="hero-link" href={cfg.contact.github} target="_blank" rel="noopener noreferrer"><Github size={16} /><span>GITHUB PROFILE</span></a></div>
    </motion.div>
    <div className="hero-bottom"><button className="reel-button" onClick={() => onProject(projects[0])}><span className="play-circle"><Play size={12} fill="currentColor" /></span>{hero.reel}<span className="muted">{hero.reelTag}</span></button><span className="hero-scroll">SCROLL TO DISCOVER <ArrowDown size={13} /></span><span className="edition">{hero.edition}</span></div>
  </section>;
}

const artFor = (project, cfg) => project.image || project.logo || projectArt(project, Math.max(0, cfg.projects.findIndex(p => p.id === project.id)), cfg.theme);
const logoOnly = p => !p.image && !!p.logo;

function ProjectCard({ project, index, onOpen }) {
  const cfg = useConfig();
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 }), ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const tilt = enabled && cfg.scene.tilt;
  return <motion.article ref={ref} className="project-card" layout initial={enabled ? { opacity: 0, y: 32 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.08 }} transition={{ duration: enabled ? 0.6 : 0, delay: (index % 3) * 0.06, ease: EASE }} exit={{ opacity: 0, scale: 0.96 }}>
    <motion.button className="project-open" style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : {}} onPointerMove={e => {
      if (!tilt || e.pointerType !== 'mouse') return;
      const r = e.currentTarget.getBoundingClientRect();
      ry.set(((e.clientX - r.left) / r.width - .5) * 12); rx.set(((e.clientY - r.top) / r.height - .5) * -10);
    }} onPointerLeave={() => { rx.set(0); ry.set(0); }} onClick={() => onOpen(project)} aria-label={`Open ${project.title}`}><motion.div className={`project-picture ${logoOnly(project) ? 'logo-art' : ''}`} style={enabled ? { y } : {}}><MediaImage src={artFor(project, cfg)} alt="" /></motion.div><span className="project-type">{project.category.toUpperCase()}</span><span className="project-hover"><ArrowUpRight size={22} /></span><span className="project-frame" aria-hidden="true" /></motion.button>
    <button className="project-caption" onClick={() => onOpen(project)}><span className="project-number display">{String(index + 1).padStart(2, '0')}</span><span><h3>{project.title}</h3><span className="project-category">{project.category}{project.year ? ` / ${project.year}` : ''}</span></span><ArrowUpRight size={20} /></button>
  </motion.article>;
}

function BrandLogo({ brand }) {
  return <div className="brand-logo" title={brand.name}>{brand.image ? <img src={brand.image} alt={brand.name} width="150" height="60" loading="lazy" draggable="false" /> : <span className="brand-word display">{brand.name}</span>}</div>;
}

function BrandStrip() {
  const { brands, headings } = useConfig();
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const loopWidth = useRef(0);
  const inView = useInView(ref);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const update = () => { loopWidth.current = ref.current?.querySelector('.brand-set')?.getBoundingClientRect().width || 0; };
    const observer = new ResizeObserver(update);
    observer.observe(ref.current); update();
    return () => observer.disconnect();
  }, []);
  useAnimationFrame((time, delta) => {
    if (!enabled || paused || interacting || !inView || !ref.current || !loopWidth.current) return;
    const el = ref.current;
    el.scrollLeft += Math.min(delta, 40) * 0.038;
    if (el.scrollLeft >= loopWidth.current) el.scrollLeft -= loopWidth.current;
  });
  if (!brands.length) return null;
  const [a, b] = headings.strip.split('\n');
  return <Reveal className="brand-section"><div className="brand-heading"><p>{a}<br /><strong>{b}</strong></p><div><button className="icon-button brand-pause" aria-label={paused ? 'Resume logos' : 'Pause logos'} aria-pressed={paused} onClick={() => setPaused(v => !v)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button></div></div>
    <div className="brand-viewport" ref={ref} onPointerEnter={e => { if (e.pointerType === 'mouse') setInteracting(true); }} onPointerLeave={() => setInteracting(false)} onPointerDown={() => setPaused(true)} tabIndex={0} role="region" aria-label="Clients and employers"><div className="brand-rail">{[0, 1, 2, 3].map(copy => <div className="brand-set" key={copy} aria-hidden={copy ? true : undefined}>{brands.map((x, i) => <BrandLogo key={i} brand={x} />)}</div>)}</div></div></Reveal>;
}

function Portfolio({ onProject }) {
  const { projects: archive, headings } = useConfig();
  const categories = ['All', ...new Set(archive.map(p => p.category))];
  const featured = archive.filter(p => p.featured);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [limit, setLimit] = useState(9);
  const results = archive.filter(p => (category === 'All' || p.category === category) && `${p.title} ${p.category} ${p.role}`.toLowerCase().includes(query.toLowerCase()));
  const projects = expanded || category !== 'All' || query ? results.slice(0, limit) : (featured.length ? featured : archive);
  return <section id="portfolio" className="portfolio section-wrap">
    <Reveal className="section-heading"><div><span className="eyebrow">{headings.workEyebrow}</span><h2>{headings.work}<span className="accent">.</span></h2></div><button className="text-link" onClick={() => { if (expanded) { setExpanded(false); setCategory('All'); setQuery(''); } else { setExpanded(true); setLimit(9); } }}>{expanded ? 'FEATURED WORK' : 'ALL WORK'}<ArrowRight size={21} /></button></Reveal>
    <Reveal className="portfolio-toolbar">
      <div className="filters" role="group" aria-label="Filter work by category">
        {categories.map(c => <button key={c} className={category === c ? 'selected' : ''} aria-pressed={category === c} onClick={() => { setCategory(c); setExpanded(true); setLimit(9); }}>{c}{c === category && <motion.span className="filter-line" layoutId="filter-line" />}</button>)}
      </div>
      <label className="search-box"><Search size={15} /><span>Search</span><input aria-label="Search work" type="search" placeholder="Title or category…" value={query} onChange={e => { setQuery(e.target.value); setExpanded(true); setLimit(9); }} /></label>
    </Reveal>
    <motion.div className="project-grid" layout><AnimatePresence mode="popLayout">{projects.map((p, i) => <ProjectCard key={p.id || p.title} project={p} index={i} onOpen={onProject} />)}</AnimatePresence></motion.div>
    {projects.length === 0 && <div className="empty-state"><p>No work matches “{query}”.</p><button className="text-link" onClick={() => { setQuery(''); setCategory('All'); }}>Reset search <X size={15} /></button></div>}
    {expanded && results.length > limit && <div className="load-more"><button className="outline-button" onClick={() => setLimit(v => v + 9)}>Show more <Plus size={16} /></button><span>{projects.length} of {results.length}</span></div>}
    <BrandStrip />
  </section>;
}

function Company({ onProject }) {
  const { company, planned, headings: h } = useConfig();
  return <section id="company" className="section-wrap company">
    <Reveal className="section-heading"><div><span className="eyebrow">{h.companyEyebrow}</span><h2>{h.company}<span className="accent">.</span></h2></div></Reveal>
    <div className="project-grid company-grid">{company.map((p, i) => <ProjectCard key={p.id || p.title} project={p} index={i} onOpen={onProject} />)}</div>
    {planned.length > 0 && <Reveal className="planned"><p className="eyebrow">{h.companyPlanned}</p><div className="planned-list">{planned.map(v => <div key={v.name}>{v.logo && <img src={v.logo} alt="" loading="lazy" width="44" height="44" />}<span><strong>{v.name}</strong><small>{v.stage}</small><p>{v.text}</p></span></div>)}</div></Reveal>}
  </section>;
}

function Code() {
  const { code, headings: h, contact } = useConfig();
  return <section id="code" className="section-wrap code-section">
    <Reveal className="section-heading"><div><span className="eyebrow">{h.codeEyebrow}</span><h2>{h.code}<span className="accent">.</span></h2></div><a className="text-link" href={contact.github} target="_blank" rel="noopener noreferrer">GITHUB PROFILE<Github size={16} /></a></Reveal>
    <div className="code-list">{code.map(r => <Reveal key={r.title}><a className="code-row" href={r.url} target="_blank" rel="noopener noreferrer"><span><h3>{r.title}</h3><p>{r.text}</p><small>{r.tags}</small></span><ArrowUpRight size={20} /></a></Reveal>)}</div>
  </section>;
}

function Awards({ onProject }) {
  const { impact, headings, projects } = useConfig();
  const [expanded, setExpanded] = useState(false);
  return <section id="awards" className={`recognition section-wrap ${expanded ? 'awards-expanded' : ''}`}>
    <Reveal className="recognition-intro">
      <span className="eyebrow">{headings.impactEyebrow}</span>
      <h2 className="display">{headings.impactA}<br /><span className="accent">{headings.impactB}</span></h2>
      <div className="award-total"><span className="display">{headings.impactHero}<span>{headings.impactHeroSuffix}</span></span><span className="award-total-label">{headings.impactHeroLabel}</span></div>
      <p>{headings.impactNote}</p>
      <button className="text-link award-proof" onClick={() => onProject(projects.find(p => p.id === 'piramal') || projects[0])}>VIEW THE ENGAGEMENT<ArrowUpRight size={18} /></button>
    </Reveal>
    <div className="recognition-list">
      <div className="recognition-list-head"><span>SELECTED RESULTS</span><span>2025 – 2026</span></div>
      <ol id="recognition-list">{impact.map((item, i) => <Reveal as="li" className={`recognition-row ${i > 2 ? 'additional-award' : ''}`} key={i} delay={i * .045}>
        <span className="award-index">0{i + 1}</span>
        <div><h3>{item.title}</h3><p>{item.event}</p></div>
        <span className="award-year display">{item.value}</span>
      </Reveal>)}</ol>
      {impact.length > 3 && <button className="award-expand" aria-expanded={expanded} aria-controls="recognition-list" onClick={() => setExpanded(v => !v)}>{expanded ? 'Show fewer' : 'Show all results'}{expanded ? <Minus size={16} /> : <Plus size={16} />}</button>}
    </div>
  </section>;
}

function Breakdown() {
  const { headings: h, images, theme } = useConfig();
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  const [manual, setManual] = useState(false);
  const [cut, setCut] = useState(65);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  useMotionValueEvent(scrollYProgress, 'change', v => { if (!manual && enabled) setCut(Math.round(90 - v * 80)); });
  const titleX = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return <section className="breakdown section-wrap" id="breakdown" ref={ref} aria-labelledby="breakdown-title"><Reveal className="breakdown-copy"><span className="eyebrow">{h.breakdownEyebrow}</span><motion.h2 id="breakdown-title" className="display" style={enabled ? { x: titleX } : {}}>{h.breakdownA}<br /><span className="accent">{h.breakdownB}</span></motion.h2><p>{h.breakdownText}</p><span className="breakdown-credit">{lines(h.breakdownCredit)}</span></Reveal><Reveal className="comparison"><div className="comparison-stage" style={{ '--cut': `${enabled || manual ? cut : 50}%` }}><MediaImage src={images.before || beforeArt(theme)} alt={h.beforeLabel} /><div className="comparison-final"><MediaImage src={images.after || afterArt(theme)} alt={h.afterLabel} /></div><span className="comparison-label raw-label">{h.beforeLabel}</span><span className="comparison-label final-label">{h.afterLabel}</span><div className="comparison-divider"><span><ChevronLeft size={14} /><ChevronRight size={14} /></span></div><input id="comparison-range" aria-label="Compare before and after" aria-valuetext={`${cut}% before, ${100 - cut}% after`} type="range" min="0" max="100" value={cut} onChange={e => { setManual(true); setCut(Number(e.target.value)); }} /></div><div className="comparison-caption"><span>DRAG TO COMPARE</span><span>DRAG / SCROLL</span></div></Reveal></section>;
}

function About() {
  const cfg = useConfig();
  const { headings: h } = cfg;
  const enabled = useContext(MotionContext);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 75%'] });
  return <section id="about" className="about section-wrap" ref={ref}>
    <Reveal className="about-lead"><div><span className="eyebrow">{h.aboutEyebrow}</span><h2 className="display">{h.aboutA}<br />{h.aboutB} <span className="accent">{h.aboutC}</span></h2></div><p>{cfg.about}</p></Reveal>
    <div className="studio-grid">
      <Reveal className="education-panel"><h3 className="panel-heading">EDUCATION & SKILLS</h3><p className="eyebrow accent">BACKGROUND</p>{cfg.education.map((e, i) => <div className="education-row" key={i}><strong>{e.title}</strong>{e.meta && <span>{e.meta}</span>}<p>{e.text}</p></div>)}<p className="eyebrow accent skills-heading">SAP MM TOOLKIT</p><div className="skill-tags">{cfg.skills.map(s => <span key={s}>{s}</span>)}</div><p className="eyebrow accent skills-heading">KEY T-CODES</p><div className="skill-tags tcodes">{cfg.tcodes.map(s => <span key={s}>{s}</span>)}</div></Reveal>
      <div className="process-panel"><Reveal><h3 className="panel-heading">{h.processTitle}</h3></Reveal><div className="process-list"><div className="process-track"><motion.div style={{ scaleY: enabled ? scrollYProgress : 1 }} /></div>{cfg.process.map((step, i) => <Reveal key={i} className="process-row" delay={i * 0.035}><span className="process-num display">{String(i + 1).padStart(2, '0')}</span><span className="process-node" /><div><h4>{step.title}</h4><p>{step.text}</p></div></Reveal>)}</div></div>
      <Reveal className="quote-panel"><span className="quote-mark display">“</span><blockquote>{lines(h.quote)}<br /><em>{lines(h.quoteEm)}</em></blockquote><span className="handwriting">Nitish</span><div className="quote-bottom">{lines(h.quoteBottom)}<span className="quote-symbol" aria-hidden="true">✳</span></div></Reveal>
    </div>
  </section>;
}

function Journey({ onProject }) {
  const { experience, courses, headings: h, resume } = useConfig();
  const openResume = useContext(ResumeAction);
  const [open, setOpen] = useState(0);
  return <section id="experience" className="journey section-wrap">
    <Reveal className="section-heading"><div><span className="eyebrow">{h.journeyEyebrow}</span><h2>{h.journey}<span className="accent">.</span></h2></div>{resumeOpen(resume) && <button type="button" className="text-link" onClick={openResume}>RESUME<ArrowUpRight size={16} /></button>}</Reveal>
    <div className="journey-grid"><div className="experience-list">{experience.map((job, i) => <Reveal className={`experience-row ${open === i ? 'is-open' : ''}`} key={i}><button aria-expanded={open === i} aria-controls={`job-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="experience-date">{job.date}</span><span><h3>{job.title}</h3><span className="experience-place">{job.place}</span></span>{open === i ? <Minus size={18} /> : <Plus size={18} />}</button><AnimatePresence initial={false}>{open === i && <motion.div id={`job-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}><p>{job.text}</p></motion.div>}</AnimatePresence></Reveal>)}</div>
      <Reveal className="awards-panel"><p className="eyebrow">{h.milestonesEyebrow}</p><h3 className="display">{h.milestonesA}<br /><span className="accent">{h.milestonesB}</span></h3><div className="award-list">{courses.map((c, i) => c.image ? <button key={i} onClick={() => onProject({ title: c.title, image: c.image, category: 'SAP Learning', description: 'Completed on SAP Learning.' })}><span>{String(i + 1).padStart(2, '0')}</span><span>{c.title}</span><ArrowUpRight size={19} /></button> : <div className="course-row" key={i}><span>{String(i + 1).padStart(2, '0')}</span><span>{c.title}</span></div>)}</div></Reveal></div>
  </section>;
}

function Contact({ onProject }) {
  const { contact, headings: h, projects, scene } = useConfig();
  const [note, setNote] = useState('');
  const [draft, setDraft] = useState('');
  const send = async e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = `Hello Nitish, this is ${data.get('name')}.\n\nTopic: ${data.get('type')}\n${data.get('message')}`;
    setDraft(text);
    try { await navigator.clipboard.writeText(text); setNote(`Message copied. Paste it into an email to ${contact.email}.`); }
    catch { setNote(`Copy the message below and send it to ${contact.email}.`); }
  };
  return <section id="contact" className="contact section-wrap">
    <div className="contact-grid"><Reveal className="contact-intro"><span className="eyebrow">{h.contactEyebrow}</span><h2 className="display">{h.contactA}<br />{h.contactB}<span className="accent">.</span></h2><p>{lines(h.contactText)}</p><Magnetic href={`mailto:${contact.email}`} className="contact-cta"><span className="round-arrow"><ArrowUpRight size={21} /></span>{h.contactCta}</Magnetic></Reveal>
      <Reveal className="contact-links" delay={0.1}><a href={`mailto:${contact.email}`}><Mail /><span><small>EMAIL</small>{contact.email}</span><ArrowUpRight size={16} /></a><a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin /><span><small>LINKEDIN</small>{contact.linkedinLabel}</span><ArrowUpRight size={16} /></a><a href={contact.github} target="_blank" rel="noopener noreferrer"><Github /><span><small>GITHUB</small>{contact.githubLabel}</span><ArrowUpRight size={16} /></a><a href={`tel:${contact.phone.replace(/\s/g, '')}`}><Phone /><span><small>PHONE</small>{contact.phone}</span><ArrowUpRight size={16} /></a><div><MapPin /><span><small>BASED IN</small>{contact.location}</span></div></Reveal>
      <Reveal className="contact-reel" delay={0.2}><button onClick={() => onProject(projects[0])} aria-label={`Open ${projects[0]?.title}`}><div className="reel-screen"><span className="reel-screen-top">P2P<span>ME21N / MIGO / MIRO</span></span>{scene.enabled && scene.contact && <Scene kind="flow" zoom={.8} />}<span className="reel-screen-title display">{h.reelA}<br /><span>{h.reelB}</span></span><span className="play-circle"><Play size={18} fill="currentColor" /></span></div><span className="reel-caption">{h.reelCaption}</span></button></Reveal></div>
    <Reveal><details className="project-brief"><summary>Write me a message <Plus size={19} /></summary><form onSubmit={send}><label htmlFor="brief-name">Your name<input id="brief-name" name="name" required placeholder="Name or company" autoComplete="name" maxLength="100" /></label><label htmlFor="brief-type">Topic<select id="brief-type" name="type"><option>SAP MM role</option><option>S/4HANA migration support</option><option>Master data work</option><option>Something else</option></select></label><label className="brief-message" htmlFor="brief-message">Message<textarea id="brief-message" name="message" required rows="3" placeholder="Tell me about the role or project…" maxLength="3000" /></label><button className="solid-button" type="submit">Copy my message <Copy size={18} /></button><p className="form-note" role="status">{note || 'Your message is prepared here, then you send it from your own email.'}</p>{draft && <textarea id="brief-draft" className="brief-message" readOnly rows="4" value={draft} aria-label="Your message" />}</form></details></Reveal>
  </section>;
}

function ProjectDialog({ project, onClose }) {
  const cfg = useConfig();
  const ref = useRef(null);
  const enabled = useContext(MotionContext);
  useEffect(() => {
    const previous = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const listener = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const nodes = [...ref.current.querySelectorAll('button, a[href]')].filter(n => !n.disabled && n.getClientRects().length);
        const first = nodes[0]; const last = nodes.at(-1);
        if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener('keydown', listener);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', listener); previous?.focus(); };
  }, [onClose]);
  const points = (project.points || '').split('\n').filter(Boolean);
  return <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <motion.div ref={ref} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabIndex="-1" initial={enabled ? { y: 45, scale: 0.97 } : false} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}>
      <div className="dialog-heading"><span className="eyebrow">{project.category} {project.year && ` / ${project.year}`}</span><button onClick={onClose} className="icon-button" aria-label="Close"><X /></button></div>
      <div className={`dialog-media still ${logoOnly(project) ? 'logo-art' : ''}`}><MediaImage src={artFor(project, cfg)} alt={project.title} /></div>
      <div className="dialog-description"><div><h2 id="dialog-title">{project.title}</h2>{project.role && <span className="accent">{project.role}</span>}<p>{project.description}</p>{points.length > 0 && <ul className="dialog-points">{points.map((p, i) => <li key={i}>{p}</li>)}</ul>}{project.tags && <div className="skill-tags dialog-tags">{project.tags.split(',').map(t => <span key={t}>{t.trim()}</span>)}</div>}</div><div className="dialog-links">{project.link && <a className="outline-button" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel || 'Open link'}<ExternalLink size={15} /></a>}{project.repo && <a className="outline-button" href={project.repo} target="_blank" rel="noopener noreferrer">View code<Github size={15} /></a>}</div></div>
    </motion.div>
  </motion.div>;
}

const SECTIONS = { portfolio: Portfolio, company: Company, code: Code, awards: Awards, breakdown: Breakdown, about: About, experience: Journey, contact: Contact };

function applyTheme(cfg) {
  const { theme, layout } = cfg, root = document.documentElement, s = root.style;
  s.setProperty('--bg', theme.bg); s.setProperty('--panel', theme.panel); s.setProperty('--ink', theme.ink); s.setProperty('--muted', theme.muted); s.setProperty('--red', theme.accent);
  s.setProperty('--display', `'${theme.display}',Impact,sans-serif`); s.setProperty('--body', `'${theme.body}',system-ui,sans-serif`);
  const dark = parseInt(theme.bg.slice(1, 3), 16) < 128;
  s.setProperty('color-scheme', dark ? 'dark' : 'light');
  root.dataset.density = layout.density; root.dataset.cols = layout.columns; root.dataset.corners = theme.corners; root.dataset.grain = theme.grain ? 'on' : 'off';
  document.title = cfg.hero.wordmark === 'NITISH' ? 'Nitish Chunduru' : cfg.hero.wordmark;
}

function App() {
  const reduced = useReducedMotion();
  const [config, setConfig] = useState(defaults);
  const [saved, setSaved] = useState(defaults);
  const [adminMode, setAdminMode] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [motionOn, setMotionOn] = useState(() => { try { return localStorage.getItem('nitish-motion') !== 'off'; } catch { return true; } });
  const enabled = motionOn && !reduced;
  const [project, setProject] = useState(null);
  const [resumeShown, setResumeShown] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, restDelta: 0.001 });
  useEffect(() => {
    loadConfig().then(c => { setConfig(c); setSaved(c); });
    const check = () => canEditPage().then(mode => { setAdminMode(mode); if (mode && location.hash === '#admin') setAdminOpen(true); });
    check(); window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);
  useEffect(() => { document.documentElement.dataset.motion = enabled ? 'on' : 'off'; }, [enabled]);
  useEffect(() => applyTheme(config), [config]);
  const toggle = () => { setMotionOn(!motionOn); try { localStorage.setItem('nitish-motion', motionOn ? 'off' : 'on'); } catch {} };
  const close = React.useCallback(() => setProject(null), []);
  const sections = config.layout.order.filter(id => !config.layout.hidden.includes(id));
  return <Config.Provider value={config}><ResumeAction.Provider value={() => setResumeShown(true)}><MotionContext.Provider value={enabled}>
    <MotionConfig reducedMotion={enabled ? 'user' : 'always'} transition={{ ease: EASE }}>
      <a className="skip-link" href="#portfolio">Skip to work</a>
      <motion.div className="reading-progress" style={{ scaleX: enabled ? progress : scrollYProgress }} />
      <Header enabled={enabled} onToggle={toggle} sections={sections} admin={!!adminMode} onAdmin={() => setAdminOpen(true)} />
      <main>
        <Hero onProject={setProject} sections={sections} />
        {sections.map(id => { const Section = SECTIONS[id]; return <Section key={id} onProject={setProject} />; })}
      </main>
      <footer className="footer">
        <a className="wordmark" href="#home">{config.hero.wordmark}<span>®</span></a>
        <span>© {new Date().getFullYear()} NITISH CHUNDURU. {config.headings.footer}</span>
        <div>
          <a href={config.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={17} /></a>
          <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href="#home" aria-label="Back to top"><ArrowUpRight size={18} /></a>
        </div>
      </footer>
      <AnimatePresence>{project && <ProjectDialog key={project.title} project={project} onClose={close} />}</AnimatePresence>
      {resumeShown && <ResumeDialog resume={config.resume} onClose={() => setResumeShown(false)} />}
      {adminOpen && <Admin config={config} setConfig={setConfig} saved={saved} setSaved={setSaved} mode={adminMode} onClose={() => { setAdminOpen(false); if (location.hash === '#admin') history.replaceState(null, '', ' '); }} />}
    </MotionConfig>
  </MotionContext.Provider></ResumeAction.Provider></Config.Provider>;
}

createRoot(document.getElementById('root')).render(<App />);
