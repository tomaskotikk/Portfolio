import { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Trophy } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { caseStudies } from '../assets/data/caseStudies';
import { gsap, useGSAP, reduced } from '../lib/motion';

const t = {
  cs: {
    back: 'Zpět na projekty',
    year: 'Rok',
    role: 'Role',
    type: 'Typ',
    stack: 'Technologie',
    about: 'O projektu',
    features: 'Co umí',
    gallery: 'Ukázky',
    mobile: 'Na mobilu',
    live: 'Otevřít web',
    repo: 'Zdrojový kód',
    next: 'Další projekt',
    kind: { web: 'Webová aplikace', mobile: 'Mobilní aplikace', game: 'Hra', tool: 'AI nástroj' },
    cta: 'Líbí se vám to? Pojďme spolu něco postavit.',
    contact: 'Napsat e-mail',
  },
  en: {
    back: 'Back to work',
    year: 'Year',
    role: 'Role',
    type: 'Type',
    stack: 'Stack',
    about: 'About',
    features: 'Highlights',
    gallery: 'Screens',
    mobile: 'On mobile',
    live: 'Open website',
    repo: 'Source code',
    next: 'Next project',
    kind: { web: 'Web app', mobile: 'Mobile app', game: 'Game', tool: 'AI tool' },
    cta: 'Like it? Let’s build something together.',
    contact: 'Send an email',
  },
};

export default function ProjectPage({ slug, lang, onBack }) {
  const tx = t[lang];
  const root = useRef(null);
  const idx = Math.max(0, caseStudies.findIndex((c) => c.slug === slug));
  const p = caseStudies[idx];
  const next = caseStudies[(idx + 1) % caseStudies.length];

  useEffect(() => {
    document.title = `${p.title} — Tomáš Kotík`;
    return () => {
      document.title = 'Tomáš Kotík — Full-stack web developer';
    };
  }, [p]);

  useGSAP(
    () => {
      gsap.fromTo('.pp__progress', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
      if (reduced) return;
      gsap.from('.pp [data-in]', { y: 30, autoAlpha: 0, duration: 1, ease: 'expo.out', stagger: 0.06 });
      gsap.from('.pp__cover', { clipPath: 'inset(12% 6% 0 6% round 12px)', duration: 1.4, ease: 'expo.out', delay: 0.15 });
    },
    { scope: root, dependencies: [slug] }
  );

  return (
    <article className="pp" ref={root} key={slug}>
      <div className="pp__progress" aria-hidden="true" />
      <div className="container">
        <a
          href="#work"
          className="pp__back mono"
          data-in
          onClick={(e) => {
            e.preventDefault();
            onBack('#work');
          }}
        >
          <ArrowLeft size={14} /> {tx.back}
        </a>

        <header className="pp__head">
          {p.award && (
            <span className="spot__badge" data-in>
              <Trophy size={13} strokeWidth={2.4} /> {p.award[lang]}
            </span>
          )}
          <h1 className="pp__title" data-in>
            {p.title}
            <span className="accent">.</span>
          </h1>
          <p className="pp__tagline" data-in>
            {p.tagline[lang]}
          </p>
          <div className="pp__actions" data-in>
            {p.links.live && (
              <a href={p.links.live} target="_blank" rel="noreferrer" className="btn btn--accent">
                {tx.live} <ArrowUpRight size={16} />
              </a>
            )}
            {p.links.repo && (
              <a href={p.links.repo} target="_blank" rel="noreferrer" className="btn">
                <GithubIcon size={16} /> {tx.repo}
              </a>
            )}
          </div>
        </header>

        <dl className="pp__meta" data-in>
          <div>
            <dt className="mono">{tx.year}</dt>
            <dd>{p.year}</dd>
          </div>
          <div>
            <dt className="mono">{tx.type}</dt>
            <dd>{p.kindLabel ? p.kindLabel[lang] : tx.kind[p.kind]}</dd>
          </div>
          <div>
            <dt className="mono">{tx.role}</dt>
            <dd>{p.role[lang]}</dd>
          </div>
          <div>
            <dt className="mono">{tx.stack}</dt>
            <dd className="pp__stack">
              {p.stack.map((s) => (
                <span className="tag tag--tech" key={s}>
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      <div className="container">
        {p.desktop.length ? (
          <figure className="pp__cover browser">
            <span className="browser__bar">
              <i />
              <i />
              <i />
              <span className="mono">{(p.links.live || p.links.repo || '').replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
            </span>
            <img src={p.desktop[0]} alt={p.title} />
          </figure>
        ) : (
          <figure className="pp__cover pp__cover--phones">
            {p.mobile.map((src) => (
              <span className="phone phone--lg" key={src}>
                <img src={src} alt={p.title} />
              </span>
            ))}
          </figure>
        )}
      </div>

      <div className="container pp__body">
        <section className="pp__about">
          <h2 className="mono">{tx.about}</h2>
          <div>
            {p.about[lang].map((para, i) => (
              <p key={i} data-reveal>
                {para}
              </p>
            ))}
          </div>
        </section>
        <section className="pp__features">
          <h2 className="mono">{tx.features}</h2>
          <ul>
            {p.features[lang].map((f) => (
              <li key={f} data-reveal>
                <Check size={16} /> {f}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {(p.desktop.length > 1 || (p.desktop.length > 0 && p.mobile.length > 0)) && (
        <div className="container pp__gallery">
          <h2 className="mono">{tx.gallery}</h2>
          <div className="pp__grid">
            {p.desktop.slice(1).map((src) => (
              <figure className="browser" key={src} data-reveal>
                <span className="browser__bar">
                  <i />
                  <i />
                  <i />
                </span>
                <img src={src} alt="" loading="lazy" />
              </figure>
            ))}
          </div>
          {p.mobile.length > 0 && (
            <div className="pp__mobile" data-reveal>
              <h3 className="mono">{tx.mobile}</h3>
              <div className={`pp__phones${p.mobile.length === 1 ? ' pp__phones--single' : ''}`}>
                {p.mobile.map((src) => (
                  <span className="phone phone--lg" key={src}>
                    <img src={src} alt="" loading="lazy" />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="container">
        <div className="pp__cta" data-reveal>
          <p>{tx.cta}</p>
          <a href="mailto:tomaskotik08@gmail.com" className="btn btn--accent">
            {tx.contact} <ArrowUpRight size={16} />
          </a>
        </div>

        <a href={`#/projekt/${next.slug}`} className="pp__next">
          <span className="mono">{tx.next}</span>
          <span className="pp__nextTitle">
            {next.title} <ArrowRight size={28} />
          </span>
          <img src={next.cover} alt="" loading="lazy" />
        </a>
      </div>
    </article>
  );
}
