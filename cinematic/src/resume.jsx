import React, { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist/build/pdf.js';
import { X, Download, Lock } from 'lucide-react';
import { fileBytes, saveFile, unlockResume } from './storage.js';

export const resumeOpen = r => r.access !== 'private' && !!(r.file || r.encrypted);

let workerReady;
const ensureWorker = () => workerReady ||= fetch('./Asset/dist/pdf.worker.min.js').then(r => r.text()).then(t => {
  pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([t], { type: 'text/javascript' }));
});

function Pages({ bytes, onError }) {
  const box = useRef(null);
  useEffect(() => {
    let stop = false, doc;
    (async () => {
      try {
        await ensureWorker();
        doc = await pdfjs.getDocument({ data: bytes.slice() }).promise;
        const width = Math.min(box.current.clientWidth, 900), dpr = Math.min(devicePixelRatio || 1, 2);
        for (let n = 1; n <= doc.numPages && !stop; n++) {
          const page = await doc.getPage(n);
          const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width * dpr });
          const c = document.createElement('canvas');
          c.width = viewport.width; c.height = viewport.height; c.setAttribute('role', 'img'); c.setAttribute('aria-label', `Resume page ${n}`);
          box.current?.append(c);
          await page.render({ canvasContext: c.getContext('2d'), viewport }).promise;
        }
      } catch { if (!stop) onError(); }
    })();
    return () => { stop = true; doc?.destroy(); };
  }, [bytes]);
  return <div className="resume-pages" ref={box} />;
}

export function ResumeDialog({ resume, onClose }) {
  const [bytes, setBytes] = useState(null);
  const [code, setCode] = useState('');
  const [note, setNote] = useState('');
  const [failed, setFailed] = useState(false);
  const panel = useRef(null);
  useEffect(() => {
    const previous = document.activeElement, old = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; panel.current?.focus();
    const key = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', key); previous?.focus(); };
  }, [onClose]);
  useEffect(() => {
    if (resume.file) fileBytes(resume.file).then(setBytes).catch(() => setFailed(true));
  }, [resume.file]);
  const unlock = async e => {
    e.preventDefault();
    try { setBytes(await unlockResume(resume.encrypted, code)); setNote(''); }
    catch { setNote('That access code is not correct.'); }
  };
  const download = async () => {
    const ok = await saveFile(resume.name, new Blob([bytes], { type: 'application/pdf' }));
    if (!ok) setNote('Download is not available in this view.');
  };
  const locked = !resume.file && !bytes;
  return <div className="dialog-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div ref={panel} className="project-dialog resume-dialog" role="dialog" aria-modal="true" aria-label="Resume" tabIndex="-1">
      <div className="dialog-heading"><span className="eyebrow">RESUME{resume.updated ? ` / ${resume.updated.toUpperCase()}` : ''}</span><div className="resume-actions">{bytes && resume.download && <button className="outline-button" onClick={download}>Download PDF<Download size={15} /></button>}<button onClick={onClose} className="icon-button" aria-label="Close"><X /></button></div></div>
      {note && <p className="resume-note" role="status">{note}</p>}
      {locked ? <form className="resume-lock" onSubmit={unlock}><Lock size={22} /><h2>This resume is shared on request</h2><p>Enter the access code you were given.</p><label htmlFor="resume-access">Access code<input id="resume-access" value={code} onChange={e => setCode(e.target.value)} autoComplete="off" required /></label><button className="solid-button" type="submit">Open resume</button></form>
        : failed ? <p className="resume-note">The resume could not be opened here.{bytes && resume.download ? ' Use Download PDF instead.' : ''}</p>
          : bytes ? <Pages bytes={bytes} onError={() => setFailed(true)} /> : <div className="media-loading static"><span className="loading-ring" /><p>Opening resume…</p></div>}
    </div>
  </div>;
}
