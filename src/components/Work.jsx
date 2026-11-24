import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink, Smartphone, Trophy } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projects } from '../assets/data/portfolio';
import { caseStudies } from '../assets/data/caseStudies';
import { gsap, useGSAP, reduced, ScrollTrigger } from '../lib/motion';
import SectionHead from './SectionHead';

const t = {
  cs: {
    label: 'Vybrané projekty',
    title: 'Na čem jsem pracoval',
    aside: 'Od vítězného hackathonového projektu přes mobilní aplikace až po weby pro klienty. Klikněte na projekt a podívejte se dovnitř.',
    archive: 'Další projekty',
    filters: { all: 'Vše', web: 'Weby', mobile: 'Mobilní aplikace', game: 'Hry', client: 'Pro klienty' },
    open: 'Detail',
    case: 'Zobrazit case study',
    winner: 'Vítězný projekt',
    wip: 'Ve vývoji',
    isNew: 'Novinka',
    kind: { web: 'Web', mobile: 'Mobilní app', game: 'Hra', tool: 'AI nástroj' },
  },
  en: {
    label: 'Selected work',
    title: "What I've been working on",
    aside: 'From an award-winning hackathon project to mobile apps and client websites. Click a project to look inside.',
    archive: 'More projects',
    filters: { all: 'All', web: 'Websites', mobile: 'Mobile apps', game: 'Games', client: 'Clients' },
    open: 'Details',
    case: 'View case study',
    winner: 'Award-winning project',
    wip: 'In development',
    isNew: 'New',
    kind: { web: 'Web', mobile: 'Mobile app', game: 'Game', tool: 'AI tool' },
  },
};

const archiveIds = [4, 5, 8, 9, 10, 11, 12, 13, 14, 15];
const href = (slug) => `#/projekt/${slug}`;

function Card({ p, lang, tx, i }) {
  const phone = p.mobile[0];
  const onlyMobile = !p.desktop.length;
  return (
    <a href={href(p.slug)} className={`pcard${onlyMobile ? ' pcard--mobile' : ''}`} data-cursor={tx.open} style={{ '--d': `${(i % 2) * 0.08}s` }}>
      <div className="pcard__media">
        {onlyMobile ? (
          <div className="pcard__phones">
            {p.mobile.slice(0, 3).map((src) => (
              <span className="phone" key={src}>
                <img src={src} alt="" loading="lazy" />
              </span>
            ))}
          </div>
        ) : (
          <>
            <img className="pcard__shot" src={p.cover} alt={p.title} loading="lazy" />
            {phone && (
              <span className="phone phone--float">
                <img src={phone} alt="" loading="lazy" />
              </span>
            )}
          </>
        )}
        <span className="pcard__kind mono">
          {p.kind === 'mobile' && <Smartphone size={12} />} {tx.kind[p.kind]}
          {p.client && ` · ${tx.filters.client}`}
        </span>
        {(p.wip || p.isNew) && <span className={`pcard__flag mono${p.isNew ? ' is-new' : ''}`}>{p.isNew ? tx.isNew : tx.wip}</span>}
      </div>
      <div className="pcard__info">
        <div>
          <h3>
            {p.title} <span className="mono pcard__year">{p.year}</span>
          </h3>
          <p>{p.short[lang]}</p>
        </div>
        <span className="pcard__go">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="card__tags">
        {p.stack.slice(0, 4).map((s) => (
          <span key={s} className="tag tag--tech">
            {s}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Work({ lang }) {
  const tx = t[lang];
  const root = useRef(null);
  const [filter, setFilter] = useState('all');

  const spotlight = caseStudies[0];
  const list = useMemo(
    () =>
      caseStudies.slice(1).filter((p) => {
        if (filter === 'all') return true;
        if (filter === 'client') return p.client;
        return p.kind === filter || (filter === 'web' && p.kind === 'tool');
      }),
    [filter]
  );
  const rest = archiveIds.map((id) => projects.find((p) => p.id === id)).filter(Boolean);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo('.spot__media img', { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.spot', start: 'top bottom', end: 'bottom top', scrub: true } });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.pgrid .pcard', { y: 40, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.06, clearProps: 'all' });
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true }
  );

  return (
    <section className="section" id="work" ref={root}>
      <div className="container">
        <SectionHead index="03" label={tx.label} title={tx.title} aside={tx.aside} lang={lang} />

        {/* Spotlight – Urbia */}
        <a href={href(spotlight.slug)} className="spot" data-cursor={tx.open} data-reveal>
          <div className="spot__media">
            <img src={spotlight.cover} alt={spotlight.title} />
            <div className="spot__thumbs">
              {spotlight.desktop.slice(1, 4).map((src) => (
                <img key={src} src={src} alt="" loading="lazy" />
              ))}
            </div>
          </div>
          <div className="spot__body">
            <span className="spot__badge">
              <Trophy size={13} strokeWidth={2.4} /> {tx.winner}
            </span>
            <h3>{spotlight.title}</h3>
            <p className="spot__tagline">{spotlight.tagline[lang]}</p>
            <p className="spot__award mono">{spotlight.award[lang]}</p>
            <span className="btn btn--accent btn--sm spot__cta">
              {tx.case} <ArrowUpRight size={15} />
            </span>
          </div>
        </a>

        <div className="pfilters filters" role="tablist" data-reveal>
          {Object.entries(tx.filters).map(([key, label]) => (
            <button key={key} role="tab" aria-selected={filter === key} className={filter === key ? 'is-active' : ''} onClick={() => setFilter(key)}>
              {label}
              <sup className="mono">
                {key === 'all'
                  ? caseStudies.length - 1
                  : caseStudies.slice(1).filter((p) => (key === 'client' ? p.client : p.kind === key || (key === 'web' && p.kind === 'tool'))).length}
              </sup>
            </button>
          ))}
        </div>

        <div className="pgrid">
          {list.map((p, i) => (
            <Card key={p.slug} p={p} lang={lang} tx={tx} i={i} />
          ))}
        </div>

        <div className="archive">
          <div className="archive__head" data-reveal>
            <h3>
              {tx.archive} <sup className="mono">{rest.length}</sup>
            </h3>
          </div>

          <ul className="rows">
            {rest.map((p) => (
              <li key={p.id}>
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="row">
                  <span className="row__idx mono">{String(p.id).padStart(2, '0')}</span>
                  <span className="row__title">
                    {p.title}
                    <small>{p.description[lang]}</small>
                  </span>
                  <span className="row__meta row__meta--tags">
                    {p.tags.slice(1).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </span>
                  <img className="row__thumb" src={p.image} alt="" loading="lazy" />
                  <span className="row__link">
                    {p.liveUrl.includes('github.com') ? <GithubIcon size={15} /> : <ExternalLink size={15} />}
                    <span>{p.liveUrl.includes('github.com') ? 'GitHub' : 'Live'}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
