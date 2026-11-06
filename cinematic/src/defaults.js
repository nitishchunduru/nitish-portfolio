// Every word here comes from Nitish's resume. Admin edits sit on top of this.
export const PRESETS = {
  crimson: { label: 'Crimson Stage', bg: '#090909', panel: '#101010', ink: '#f2efeb', muted: '#a09c9a', accent: '#ef4151' },
  fiori: { label: 'Fiori Blue', bg: '#07101c', panel: '#0d1a2b', ink: '#eef4fb', muted: '#93a7bd', accent: '#2f9bff' },
  plant: { label: 'Plant Green', bg: '#08110e', panel: '#0e1b16', ink: '#ecf4ef', muted: '#93aa9f', accent: '#2fcf8d' },
  hazard: { label: 'Warehouse Amber', bg: '#100d07', panel: '#1a150c', ink: '#f6f0e3', muted: '#ae9f85', accent: '#f5a524' },
  paper: { label: 'Audit Paper', bg: '#f3f1ec', panel: '#e8e5dd', ink: '#17181a', muted: '#5f6064', accent: '#c81e33' },
};

export const BUNDLED_RESUME = './Asset/cv/Nitish_Chunduru_SAP_MM_Consultant_Resume.pdf';

export const defaults = {
  version: 1,
  savedAt: 0,
  theme: { ...PRESETS.crimson, preset: 'crimson', display: 'Anton', body: 'Manrope', grain: true, corners: 'square' },
  layout: {
    order: ['portfolio', 'company', 'awards', 'breakdown', 'about', 'code', 'experience', 'contact'],
    hidden: [],
    density: 'regular',
    columns: 3,
    heroMedia: 'both',
  },
  scene: { enabled: true, kind: 'rack', speed: 1, fill: 0.8, tilt: true, contact: true },
  images: { portrait: '', before: '', after: '' },
  hero: {
    wordmark: 'NITISH', lettering: 'PORTFOLIO', name: 'NITISH', greeting: 'Hello, I’m',
    roleLines: 'SAP MM\nCONSULTANT',
    toplineA: 'SAP MM CONSULTANT / S/4HANA', toplineB: 'PROCUREMENT & INVENTORY MANAGEMENT',
    badge: 'MASTER DATA / P2P / MIGRATION',
    intro: 'Hands-on SAP S/4HANA experience across two pharmaceutical client engagements.',
    cta: 'View engagements',
    location: 'HYDERABAD, TELANGANA, INDIA',
    manifesto: 'Purchase order.\nTo posted invoice.',
    reel: 'OPEN LEAD ENGAGEMENT', reelTag: 'S/4HANA', edition: 'CLIENT WORK / 2025–2026',
  },
  stats: [
    { value: '30', suffix: '+', label: 'FUNCTIONAL TEST\nCASES EXECUTED' },
    { value: '15', suffix: '+', label: 'POST GO-LIVE USER\nISSUES RESOLVED' },
    { value: '200', suffix: '+', label: 'MATERIAL CODES\nCLASSIFIED' },
  ],
  headings: {
    work: 'ENGAGEMENTS THAT DELIVERED', workEyebrow: '01 / CLIENT WORK',
    strip: 'WORKED ACROSS\nTHE WIDER PROGRAMME.',
    impactEyebrow: 'IMPACT AT A GLANCE', impactA: 'THE WORK.', impactB: 'THE NUMBERS.',
    impactNote: 'Measured on live pharmaceutical client engagements.', impactHero: '200', impactHeroSuffix: '+', impactHeroLabel: 'MATERIAL CODES',
    breakdownEyebrow: 'PIRAMAL PHARMA / MDM SUPPORT', breakdownA: 'FROM RAW.', breakdownB: 'TO CLASSIFIED.',
    breakdownText: '200+ material codes structured across 7 procurement categories, aligned to SAP MM upload requirements.',
    breakdownCredit: 'MATERIAL MASTER DATA / 2026\nCLASSIFICATION · EXCEL VLOOKUP · VALIDATION',
    beforeLabel: 'UNSTRUCTURED', afterLabel: 'CLASSIFIED',
    aboutEyebrow: '02 / PROFILE', aboutA: 'CLEAN MASTER DATA.', aboutB: 'RELIABLE', aboutC: 'POSTINGS.',
    processTitle: 'PROCURE-TO-PAY, END TO END',
    quote: 'From migration data\nto plant-floor postings,', quoteEm: 'supporting the people\nwho run the process.', quoteBottom: 'LET’S TALK\nSAP MM.',
    journeyEyebrow: '03 / EXPERIENCE', journey: 'PROJECT WORK AND PLANT SUPPORT',
    milestonesEyebrow: 'SAP LEARNING', milestonesA: 'SELECTED', milestonesB: 'COURSES.',
    contactEyebrow: '04 / CONTACT', contactA: 'LET’S WORK', contactB: 'TOGETHER',
    contactText: 'Looking for SAP MM support?\nSend a note about the role or project.', contactCta: 'SEND AN EMAIL',
    reelA: 'SOURCE', reelB: 'TO SETTLE.', reelCaption: 'PRESS TO OPEN THE COHANCE ENGAGEMENT.',
    companyEyebrow: 'COMPANY PROJECTS', company: 'WHAT WE ARE BUILDING AT CLIP',
    companyPlanned: 'NEXT IN THE CLIP PORTFOLIO',
    codeEyebrow: 'GITHUB', code: 'PUBLIC CODE AND PROJECTS',
    footer: 'SAP MM CONSULTANT.',
  },
  about: 'SAP MM (Materials Management) Consultant with hands-on SAP S/4HANA experience, including onsite plant-level support as part of an 18+ member cross-functional migration team at Cohance Lifesciences, and material master data classification for Piramal Pharma. Completed SAP Learning’s Introduction to AI Core.',
  contact: {
    email: 'chundurunitish2001@gmail.com', phone: '+91 8074300526',
    linkedin: 'https://linkedin.com/in/nitish-chunduru', linkedinLabel: 'linkedin.com/in/nitish-chunduru',
    github: 'https://github.com/nitishchunduru', githubLabel: 'github.com/nitishchunduru',
    location: 'Hyderabad, Telangana, India',
  },
  resume: {
    file: BUNDLED_RESUME, name: 'Nitish_Chunduru_SAP_MM_Consultant_Resume.pdf', updated: 'June 2026',
    access: 'public', download: true, encrypted: null, bundledRemoved: false,
  },
  education: [
    { title: 'Bapatla Engineering College', meta: '2019 – 2023', text: 'B.Tech, Computer Science and Engineering. Bapatla, Andhra Pradesh. CGPA 7.0 out of 10.' },
    { title: 'ProvenTech Consulting Pvt Ltd', meta: '2025 – 2026', text: 'SAP MM Trainee Consultant, Hyderabad.' },
  ],
  skills: ['Procure-to-Pay', 'Material Master', 'Vendor Master', 'Purchasing Info Records', 'PO Creation & Release', 'Goods Receipt / Issue', 'Stock Transport Orders', 'Invoice Verification', 'GR/IR Reconciliation', 'Migration Validation', 'Functional Testing', 'End-User Training', 'SAP AI Core Fundamentals', 'Excel VLOOKUP', 'Oracle SQL Basics'],
  tcodes: ['ME21N', 'ME22N', 'ME23N', 'MIGO', 'MIRO', 'MM01', 'MM02', 'MM03', 'MB52', 'MMBE'],
  process: [
    { title: 'PURCHASE REQUISITION', text: 'The need is raised and sourced through contracts, scheduling agreements or a request for quotation.' },
    { title: 'PURCHASE ORDER', text: 'Create and release with ME21N, then check the PO output form and pricing.' },
    { title: 'GOODS RECEIPT', text: 'Post the receipt in MIGO against the order and the right plant and storage location.' },
    { title: 'INVOICE VERIFICATION', text: 'Verify the vendor invoice in MIRO against the order and the receipt.' },
    { title: 'GR/IR RECONCILIATION', text: 'Identify mismatches and resolve them with the Finance team.' },
  ],
  projects: [
    { id: 'cohance', title: 'Cohance Lifesciences S/4HANA Migration Support', category: 'Migration', year: '2025', role: 'SAP MM Trainee Consultant', code: 'S/4HANA', featured: true, image: '', link: '',
      description: 'Post-migration stabilisation across Suven and Cohance plants, as part of an 18+ member cross-functional team spanning MM, PP/QM and SD.',
      points: 'Onsite plant-level support for backdated August and September 2025 postings\nCross-verified SCM master and transactional datasets against SAP before mass upload\nReconciled PO sheets post-upload and corrected migration discrepancies\nSupported Invoice Verification (MIRO) and identified GR/IR mismatches with Finance' },
    { id: 'piramal', title: 'Piramal Pharma Material Master Classification', category: 'Master Data', year: '2026', role: 'Material Master Data and MDM Support', code: 'MM01', featured: true, image: '', link: '',
      description: 'Classified and structured 200+ material codes across 7 procurement categories.',
      points: 'Categories: engineering spares, packaging, laboratory, instrumentation, IT, safety and consumables\nBuilt Excel VLOOKUP reference sheets and data-validation templates\nAligned descriptions, material types, material groups and base units of measure with SAP MM upload requirements' },
    { id: 'po', title: 'Legacy CC Purchase Order Conversion', category: 'Migration', year: '2025', role: 'Cohance Lifesciences', code: 'ME21N', featured: true, image: '', link: '',
      description: 'Created and released Purchase Orders, and converted legacy CC Purchase Orders into the new S/4HANA format.', points: '' },
    { id: 'testing', title: 'PO and SO Functional Testing', category: 'Testing', year: '2025', role: 'Cohance Lifesciences', code: '30+', featured: false, image: '', link: '',
      description: 'Executed 30+ functional test cases across PO and SO scenarios, including output form and pricing trigger testing.', points: '' },
    { id: 'support', title: 'Post Go-Live Production Support', category: 'Support', year: '2025', role: 'Cohance Lifesciences', code: 'MIGO', featured: false, image: '', link: '',
      description: 'Resolved 15+ post go-live user issues relating to PO outputs, Goods Issues and Goods Receipt Notes (GRN).', points: '' },
    { id: 'training', title: 'Plant End-User Training', category: 'Support', year: '2025', role: 'Cohance Lifesciences', code: 'GRN', featured: false, image: '', link: '',
      description: 'Trained plant end users on creation and posting of Purchase Orders, Sales Orders, GRNs and Goods Issues.', points: '' },
  ],
  brands: [
    { name: 'Cohance Lifesciences', image: '' }, { name: 'Suven', image: '' }, { name: 'Piramal Pharma', image: '' }, { name: 'ProvenTech Consulting', image: '' },
  ],
  company: [
    { id: 'clip', title: 'CLIP Platform', category: 'Company', year: '2026', role: 'Website and CLIP HQ', code: 'CLIP', logo: './Asset/img/company/clip.png', image: '',
      description: 'The public website and internal operations platform for CLIP, an India-based technology and venture company. In testing ahead of a custom domain and public launch.',
      points: 'Public site covering the company, ventures, careers, insights and roadmap\nCLIP HQ staff workspace with hiring, enquiries, people, leave and an audit log\nEmail sign-in, required two-step verification and six staff roles checked on the server\nWebsite and HQ assistants that answer only from approved content',
      tags: 'Next.js, React, TypeScript, PostgreSQL, Vercel', link: 'https://clip-platform-kohl.vercel.app', linkLabel: 'Visit live site', repo: '' },
    { id: 'ananda', title: 'Ananda Nilayam Constructions', category: 'Real estate', year: '2026', role: 'Business website and admin', code: 'ANC', logo: './Asset/img/company/ananda-nilayam.svg', image: '',
      description: 'A construction and real estate website with a staff admin area.',
      points: 'Public pages for services, projects, gallery, real estate, rentals and careers\nContact, quote, newsletter and employee application workflows\nRole-gated admin for inquiries and site settings',
      tags: 'Next.js, Supabase, TypeScript, Vercel', link: 'https://v0-ananda-nilayam-constructions.vercel.app', linkLabel: 'Visit live site', repo: '' },
    { id: 'jackpot', title: 'Card Jackpot: IN BTW', category: 'Gaming', year: '2026', role: 'Multiplayer game server', code: 'IN BTW', logo: './Asset/img/company/card-jackpot.svg', image: '',
      description: 'A multi-level family card game for ages 12 and up, played with virtual credits. A local release candidate, not yet deployed.',
      points: 'Rules engine with an authoritative multiplayer server over WebSockets\nThe server handles shuffling, dealing, turns and settlement, and clients send intents only\nEach player receives only their own view, so other players\u2019 unrevealed cards stay hidden\nPostgreSQL persistence with crash and restart recovery',
      tags: 'TypeScript, Node.js, WebSockets, PostgreSQL', link: '', linkLabel: '', repo: '' },
    { id: 'couponhub', title: 'CouponHub', category: 'Consumer', year: 'Planned', role: 'CLIP venture', code: 'COUPON', logo: './Asset/img/company/couponhub.svg', image: '',
      description: 'A members-only way to bring unused vouchers, coupons and tickets back into use. This describes the product design.',
      points: '', tags: 'Consumer, Marketplace', link: '', linkLabel: '', repo: 'https://github.com/nitishchunduru/CouponHub' },
  ],
  planned: [
    { name: 'STUFF', stage: 'Upcoming', text: 'Food, beverages and everyday essentials delivery.', logo: './Asset/img/company/stuff.svg' },
    { name: 'Fuel and Feed', stage: 'Planned', text: 'Fuel for the vehicle and food for the people, in one stop on the road.', logo: './Asset/img/company/fuel-and-feed.svg' },
    { name: 'Ratna', stage: 'Exploring', text: 'A blockchain and digital-currency technology exploration.', logo: './Asset/img/company/ratna.svg' },
  ],
  code: [
    { title: 'AI Chatbot for Supplier and Product Information', text: 'React front end for a chatbot application covering supplier and product information.', tags: 'React', url: 'https://github.com/nitishchunduru/AI-Powered-Chatbot-for-Supplier-and-Product-Information' },
    { title: 'CouponHub', text: 'Early web prototype for the coupon idea, built with JavaScript, Bootstrap and Mongoose.', tags: 'JavaScript, Mongoose', url: 'https://github.com/nitishchunduru/CouponHub' },
    { title: 'Leaf Disease Detection and Recognition', text: 'B.Tech final-year team project report, Computer Science and Engineering.', tags: 'Academic project', url: 'https://github.com/nitishchunduru/Leaf-Disease-Detection-and-Recognition' },
  ],
  impact: [
    { value: '30+', title: 'Functional test cases', event: 'PO and SO scenarios, including output form and pricing triggers' },
    { value: '15+', title: 'Post go-live issues resolved', event: 'PO outputs, Goods Issues and Goods Receipt Notes' },
    { value: '200+', title: 'Material codes classified', event: 'Piramal Pharma master data' },
    { value: '18+', title: 'Member cross-functional team', event: 'MM, PP/QM and SD at Cohance Lifesciences' },
    { value: '7', title: 'Procurement categories', event: 'Spares, packaging, laboratory, instrumentation, IT, safety, consumables' },
    { value: '2', title: 'Pharmaceutical client engagements', event: 'Cohance Lifesciences and Piramal Pharma' },
  ],
  experience: [
    { date: 'JUL 2025 – JUN 2026', title: 'SAP MM Trainee Consultant', place: 'ProvenTech Consulting Pvt Ltd, Hyderabad', text: 'Delivered SAP MM work on two pharmaceutical client engagements, covering migration support, functional testing, production support, end-user training and master data.' },
    { date: 'SEP 2025 – NOV 2025', title: 'Cohance Lifesciences', place: 'SAP S/4HANA Migration Support', text: 'Supported PO creation and release, Process Orders and TECO, Stock Transport Orders, and Goods Receipt / Goods Issue processing at plant level, then trained end users on the same flows.' },
    { date: 'MAR 2026 – MAY 2026', title: 'Piramal Pharma', place: 'Material Master Data Classification and MDM Support', text: 'Classified 200+ material codes across 7 procurement categories using VLOOKUP reference sheets and data-validation templates.' },
  ],
  courses: [
    { title: 'Introduction to AI Core', image: '' },
    { title: 'Business Processes in SAP S/4HANA Sourcing and Procurement', image: '' },
    { title: 'Implementing SAP S/4HANA', image: '' },
    { title: 'Cross-Functional Customizing in SAP S/4HANA', image: '' },
    { title: 'SAP Ariba Sourcing Overview', image: '' },
  ],
};

export const SECTION_LABELS = { portfolio: 'Engagements', company: 'Company projects', code: 'GitHub projects', awards: 'Impact', breakdown: 'Before / after', about: 'Profile', experience: 'Experience', contact: 'Contact' };

// Older saved files keep working when new settings appear later.
export function merge(saved) {
  if (!saved || typeof saved !== 'object') return defaults;
  const out = { ...defaults, ...saved };
  for (const key of ['theme', 'layout', 'scene', 'images', 'hero', 'headings', 'contact', 'resume']) out[key] = { ...defaults[key], ...(saved[key] || {}) };
  if (saved.cv && !saved.resume) out.resume = { ...out.resume, file: saved.cv };
  const known = out.layout.order.filter(id => SECTION_LABELS[id]);
  defaults.layout.order.forEach((id, i) => { if (!known.includes(id)) known.splice(i, 0, id); });
  out.layout.order = known;
  return out;
}
