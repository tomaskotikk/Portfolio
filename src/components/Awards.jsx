import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { awards } from '../assets/data/portfolio';
import { getLenis } from '../lib/motion';
import SectionHead from './SectionHead';
import HoverPreview from './HoverPreview';

const t = {
  cs: {
    label: 'Ocenění',
    title: 'Uznání, které mluví za mě.',
    aside: 'Tři umístění z hackathonů AT&T v roce 2026 — včetně ceny za nejlepší technické řešení.',
    view: 'Certifikát',
    close: 'Zavřít',
  },
  en: {
    label: 'Recognition',
    title: 'Recognition that speaks for itself.',
    aside: 'Three placements at AT&T hackathons in 2026 — including the award for the best technical solution.',
    view: 'Certificate',
    close: 'Close',
  },
};

export default function Awards({ lang }) {
  const tx = t[lang];
  const preview = useRef(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <section className="section" id="awards">
      <div className="container">
        <SectionHead index="02" label={tx.label} title={tx.title} aside={tx.aside} lang={lang} />

        <ul className="rows" onPointerLeave={() => preview.current?.hide()}>
          {awards.map((a, i) => (
            <li key={a.id} data-reveal data-delay={i * 0.06}>
              <button
                className="row award"
                onPointerEnter={() => preview.current?.show(a.image)}
                onClick={() => setOpen(a)}
              >
                <span className="row__idx mono">{a.year}</span>
                <span className="row__title">
                  {a.title[lang]}
                  <small>{a.event}</small>
                </span>
                <span className="row__meta">
                  <span>{a.org}</span>
                  <small>{a.place[lang]}</small>
                </span>
                <img className="row__thumb" src={a.image} alt="" loading="lazy" />
                <ArrowUpRight className="row__arrow" size={20} />
              </button>
            </li>
          ))}
        </ul>
        <HoverPreview ref={preview} ratio="1.41 / 1" />
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${open.title[lang]} — ${open.event}`} onClick={() => setOpen(null)}>
          <button className="lightbox__close" onClick={() => setOpen(null)} aria-label={tx.close}>
            <X size={20} />
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={open.image} alt={`${open.event} — ${open.title[lang]}`} />
            <figcaption>
              <span>
                {open.title[lang]} · {open.event}
              </span>
              <span className="mono">{open.org}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
