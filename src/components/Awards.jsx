import { useEffect, useRef, useState } from 'react';
import { Award, Calendar, Cpu, Maximize2, Medal, Trophy, Users, X } from 'lucide-react';
import { awards } from '../assets/data/portfolio';
import { gsap, getLenis, finePointer, reduced } from '../lib/motion';
import SectionHead from './SectionHead';

const t = {
  cs: {
    label: 'Ocenění',
    title: 'Výsledky, které',
    highlight: 'mluví za mě.',
    lead: 'Tři umístění z hackathonů AT&T v roce 2026 — včetně ceny za nejlepší technické řešení.',
    view: 'Zobrazit certifikát',
    close: 'Zavřít',
  },
  en: {
    label: 'Awards',
    title: 'Results that',
    highlight: 'speak for me.',
    lead: 'Three placements at AT&T hackathons in 2026 — including the award for the best technical solution.',
    view: 'View certificate',
    close: 'Close',
  },
};

const icons = { 'hj-2nd': Medal, 'hj-tech': Cpu, 'ho-2nd': Trophy };

function TiltCard({ children, className, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer || reduced) return;
    gsap.set(el, { transformPerspective: 900 });
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 10);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
    };
    const reset = () => {
      rx(0);
      ry(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', reset);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', reset);
    };
  }, []);
  return (
    <button ref={ref} className={className} {...rest}>
      {children}
    </button>
  );
}

export default function Awards({ lang }) {
  const tx = t[lang];
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
        <SectionHead icon={Award} label={tx.label} title={tx.title} highlight={tx.highlight} lead={tx.lead} lang={lang} />

        <div className="awards">
          {awards.map((a, i) => {
            const Icon = icons[a.id] || Trophy;
            return (
              <div key={a.id} data-reveal data-delay={i * 0.1}>
                <TiltCard className="tile spot award-card" data-cursor={tx.view.split(' ')[0]} onClick={() => setOpen(a)} aria-label={`${tx.view}: ${a.title[lang]} — ${a.event}`}>
                  <div className="award-card__media">
                    <img src={a.image} alt="" loading="lazy" />
                    <span className="award-card__zoom">
                      <Maximize2 size={15} />
                    </span>
                  </div>
                  <div className="award-card__body">
                    <span className={`award-card__icon ${a.id === 'hj-tech' ? 'is-tech' : ''}`}>
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <h3>{a.title[lang]}</h3>
                    <p className="award-card__event">{a.event}</p>
                    <ul className="award-card__meta">
                      <li>
                        <Award size={14} /> {a.org}
                      </li>
                      <li>
                        <Users size={14} /> {lang === 'cs' ? 'Tým' : 'Team'} {a.team}
                      </li>
                      <li>
                        <Calendar size={14} /> {a.date[lang]}
                      </li>
                    </ul>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
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
                <Trophy size={16} /> {open.title[lang]} · {open.event}
              </span>
              <span className="muted">{open.org}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
