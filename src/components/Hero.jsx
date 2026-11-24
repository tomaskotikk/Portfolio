import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Trophy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { gsap, SplitText, useGSAP, reduced, finePointer, scrollTo } from '../lib/motion';
import { personal } from '../assets/data/portfolio';
import Magnetic from './Magnetic';

const t = {
  cs: {
    role: 'Full-stack web developer',
    lead: (
      <>
        Navrhuji a vyvíjím rychlé, čisté webové aplikace — <em>od databáze až po poslední pixel.</em>
      </>
    ),
    badge: '2. místo + Nejlepší technické řešení · AT&T Hackathon Junior 2026',
    cta: 'Zobrazit projekty',
    status: 'Volný pro nové projekty',
    place: 'Zlín',
  },
  en: {
    role: 'Full-stack web developer',
    lead: (
      <>
        I design and build fast, clean web applications — <em>from the database to the last pixel.</em>
      </>
    ),
    badge: '2nd Place + Best Technical Solution · AT&T Hackathon Junior 2026',
    cta: 'View selected work',
    status: 'Available for new projects',
    place: 'Zlín, CZ',
  },
};

export default function Hero({ lang, ready }) {
  const root = useRef(null);
  const tx = t[lang];
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = () => setTime(new Date().toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague' }));
    fmt();
    const id = setInterval(fmt, 15000);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      if (!ready || reduced) return;
      const split = SplitText.create('.hero__name', { type: 'chars', mask: 'chars' });
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(split.chars, { yPercent: 125, duration: 1.3, ease: 'expo.out', stagger: 0.035, onComplete: () => split.revert() })
        .from('.hero__photo', { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.inOut' }, 0)
        .from('.hero__photo picture', { scale: 1.35, duration: 1.8, ease: 'expo.out' }, 0.2)
        .from('.hero [data-in]', { y: 24, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.07 }, 0.45);

      // Scroll: photo parallax and name drift
      gsap.to('.hero__photo img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__name', {
        yPercent: -30,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: root, dependencies: [ready] }
  );

  // Soft spotlight that follows the pointer
  useEffect(() => {
    const el = root.current;
    if (!el || !finePointer || reduced) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    el.addEventListener('pointermove', move);
    return () => el.removeEventListener('pointermove', move);
  }, []);

  return (
    <section className="hero" id="top" ref={root} style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <div className="hero__spot" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__top">
          <span className="mono" data-in>
            {tx.role}
          </span>
          <span className="mono hero__status" data-in>
            <i className="pulse" /> {tx.status}
            <span className="hero__clock">{tx.place} · {time}</span>
          </span>
        </div>

        <h1 className="hero__name">
          Tomáš&nbsp;Kotík<span className="accent">.</span>
        </h1>

        <div className="hero__body">
          <div className="hero__copy">
            <a href="#awards" className="chip" data-in onClick={(e) => (e.preventDefault(), scrollTo('#awards'))}>
              <span className="chip__new">
                <Trophy size={12} strokeWidth={2.4} /> 2026
              </span>
              <span>{tx.badge}</span>
              <ArrowUpRight size={14} />
            </a>
            <p className="hero__lead" data-in>
              {tx.lead}
            </p>
            <div className="hero__actions" data-in>
              <Magnetic>
                <a href="#work" className="btn" onClick={(e) => (e.preventDefault(), scrollTo('#work'))}>
                  {tx.cta}
                  <ArrowDownRight size={16} />
                </a>
              </Magnetic>
              <a href={personal.links.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub">
                <GithubIcon size={17} />
              </a>
              <a href={personal.links.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn">
                <LinkedinIcon size={17} />
              </a>
            </div>
          </div>

          <figure className="hero__photo" data-cursor="Hi!">
            <picture>
              <source media="(max-width: 768px)" srcSet="/Images/tomas-mobile.jpg" />
              <img src={personal.avatar} alt="Tomáš Kotík" width="876" height="1024" fetchpriority="high" />
            </picture>
          </figure>
        </div>


      </div>
    </section>
  );
}
