import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock3, Mail, MapPin, Trophy, Sparkles, Code2 } from 'lucide-react';
import { gsap, SplitText, useGSAP, reduced, finePointer, scrollTo } from '../lib/motion';
import { personal } from '../assets/data/portfolio';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './BrandIcons';
import Magnetic from './Magnetic';

const t = {
  cs: {
    hello: 'Ahoj, jsem',
    role: 'Full-stack web developer',
    lead: 'Navrhuji a vyvíjím rychlé, přehledné webové aplikace — od databáze až po poslední pixel. Pracuji s Reactem, Node.js a SQL.',
    status: 'Otevřený stážím a freelance',
    badge: '2. místo + Nejlepší technické řešení — AT&T Hackathon Junior 2026',
    cta: 'Moje projekty',
    contact: 'Kontakt',
    award: 'Hackathon Junior 2026',
    awardSub: '2. místo · Best Tech',
    exp: 'Klientské weby',
    expSub: '3+ v provozu',
  },
  en: {
    hello: "Hi, I'm",
    role: 'Full-stack web developer',
    lead: 'I design and build fast, clear web applications — from the database to the last pixel. I work with React, Node.js and SQL.',
    status: 'Open to internships & freelance',
    badge: '2nd Place + Best Technical Solution — AT&T Hackathon Junior 2026',
    cta: 'View my work',
    contact: 'Contact',
    award: 'Hackathon Junior 2026',
    awardSub: '2nd place · Best Tech',
    exp: 'Client websites',
    expSub: '3+ in production',
  },
};

function Clock() {
  const fmt = () =>
    new Intl.DateTimeFormat('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague' }).format(new Date());
  const [now, setNow] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setNow(fmt()), 10000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular">{now}</span>;
}

const socials = [
  [GithubIcon, personal.links.github, 'GitHub'],
  [LinkedinIcon, personal.links.linkedin, 'LinkedIn'],
  [InstagramIcon, personal.links.instagram, 'Instagram'],
];

const logo = (n) => `/logos/${n}-original.svg`;

export default function Hero({ lang, ready }) {
  const root = useRef(null);
  const tx = t[lang];

  useGSAP(
    () => {
      if (!ready || reduced) return;
      const split = SplitText.create('.hero__name', { type: 'chars', mask: 'chars' });
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(split.chars, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.03 }, 0.15)
        .from('.hero__visual .orb', { scale: 0.4, autoAlpha: 0, duration: 1.6, ease: 'expo.out' }, 0)
        .from('.hero__visual .ring', { scale: 0.7, autoAlpha: 0, duration: 1.6, ease: 'expo.out' }, 0.1)
        .from('.hero__portrait', { y: 80, autoAlpha: 0, duration: 1.4, ease: 'expo.out' }, 0.15)
        .from('.hero [data-in]', { y: 24, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.06 }, 0.3)
        .from('.float-card', { scale: 0.6, autoAlpha: 0, duration: 0.9, ease: 'back.out(1.8)', stagger: 0.12 }, 0.8);

      // Idle floating badges (inner element, so pointer parallax on the wrapper stays independent)
      gsap.utils.toArray('.float-card__in').forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 10 : -10, duration: 2.6 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 });
      });
      gsap.to('.hero__visual .ring', { rotate: 360, duration: 60, ease: 'none', repeat: -1 });

      // Scroll parallax
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero__visual', { yPercent: 12, ease: 'none', scrollTrigger: st });
      gsap.to('.hero__copy', { y: -60, autoAlpha: 0.2, ease: 'none', scrollTrigger: st });
    },
    { scope: root, dependencies: [ready] }
  );

  // Pointer parallax on the visual layers + spotlight
  useEffect(() => {
    const el = root.current;
    if (!el || !finePointer || reduced) return;
    const setters = [...el.querySelectorAll('[data-depth]')].map((l) => ({
      x: gsap.quickTo(l, 'x', { duration: 1, ease: 'power3' }),
      y: gsap.quickTo(l, 'y', { duration: 1, ease: 'power3' }),
      d: parseFloat(l.dataset.depth),
    }));
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      setters.forEach((s) => {
        s.x(nx * s.d);
        s.y(ny * s.d);
      });
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    el.addEventListener('pointermove', move);
    return () => el.removeEventListener('pointermove', move);
  }, []);

  return (
    <section className="hero" id="top" ref={root} style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <div className="hero__spot" aria-hidden="true" />
      <div className="hero__gridbg" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <a href="#awards" className="chip" data-in onClick={(e) => (e.preventDefault(), scrollTo('#awards'))}>
            <span className="chip__icon">
              <Trophy size={13} strokeWidth={2.4} />
            </span>
            <span>{tx.badge}</span>
            <ArrowRight size={14} />
          </a>

          <p className="hero__hello" data-in>
            {tx.hello}
          </p>
          <h1 className="hero__name">Tomáš Kotík</h1>
          <p className="hero__role" data-in>
            <Code2 size={22} strokeWidth={2.2} />
            <span className="grad">{tx.role}</span>
          </p>
          <p className="hero__lead" data-in>
            {tx.lead}
          </p>

          <div className="hero__actions" data-in>
            <Magnetic>
              <a href="#work" className="btn btn--primary" onClick={(e) => (e.preventDefault(), scrollTo('#work'))}>
                {tx.cta}
                <ArrowRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn--ghost" onClick={(e) => (e.preventDefault(), scrollTo('#contact'))}>
                <Mail size={16} />
                {tx.contact}
              </a>
            </Magnetic>
            <div className="hero__socials">
              {socials.map(([Icon, href, label]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="icon-btn" aria-label={label}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <ul className="hero__meta" data-in>
            <li>
              <MapPin size={15} /> Zlín, CZ
            </li>
            <li>
              <Clock3 size={15} /> <Clock />
            </li>
            <li className="status">
              <i />
              {tx.status}
            </li>
          </ul>
        </div>

        <div className="hero__visual">
          <div className="orb" aria-hidden="true" />
          <div className="ring" aria-hidden="true" />
          <div className="hero__portrait-wrap" data-depth="12">
            <img className="hero__portrait" src="/Images/tomas-cutout.webp" alt="Tomáš Kotík" width="896" height="994" fetchpriority="high" />
          </div>
          <div className="float-card float-card--a" data-depth="30">
            <div className="float-card__in">
              <span className="float-card__icon float-card__icon--gold">
                <Trophy size={18} />
              </span>
              <span>
                <strong>{tx.award}</strong>
                <small>{tx.awardSub}</small>
              </span>
            </div>
          </div>
          <div className="float-card float-card--b" data-depth="40">
            <div className="float-card__in">
              <span className="float-card__icon">
                <Sparkles size={18} />
              </span>
              <span>
                <strong>{tx.exp}</strong>
                <small>{tx.expSub}</small>
              </span>
            </div>
          </div>
          <div className="float-card float-card--c" data-depth="24">
            <div className="float-card__in">
              <img src={logo('react')} alt="" width="22" height="22" />
              <img src={logo('nodejs')} alt="" width="22" height="22" />
              <img src={logo('postgresql')} alt="" width="22" height="22" />
              <img src={logo('java')} alt="" width="22" height="22" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
