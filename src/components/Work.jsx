import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projects } from '../assets/data/portfolio';
import { gsap, useGSAP, reduced, ScrollTrigger } from '../lib/motion';
import SectionHead from './SectionHead';

const t = {
  cs: {
    label: 'Vybrané projekty',
    title: 'Práce pro klienty i vlastní produkty.',
    aside: 'Od webů pro firmy ve Zlíně po full-stack aplikace a hry.',
    archive: 'Další projekty',
    filters: { all: 'Vše', client: 'Klienti', school: 'Škola', fun: 'Osobní' },
    visit: 'Otevřít',
    status: { Deployed: 'Live', Developing: 'Ve vývoji' },
  },
  en: {
    label: 'Selected work',
    title: 'Client work and products of my own.',
    aside: 'From websites for local businesses to full-stack apps and games.',
    archive: 'More projects',
    filters: { all: 'All', client: 'Clients', school: 'School', fun: 'Personal' },
    visit: 'Open',
    status: { Deployed: 'Live', Developing: 'In progress' },
  },
};

const featuredOrder = [20, 21, 1, 22, 23, 2];

export default function Work({ lang }) {
  const tx = t[lang];
  const root = useRef(null);
  const [filter, setFilter] = useState('all');

  const featured = featuredOrder.map((id) => projects.find((p) => p.id === id));
  const rest = useMemo(
    () => projects.filter((p) => !p.featured && (filter === 'all' || p.category === filter)),
    [filter]
  );

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray('.card__media img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }
        );
      });
    },
    { scope: root }
  );

  useGSAP(
    () => {
      if (reduced) return;
      gsap.from('.archive .row', { y: 20, autoAlpha: 0, duration: 0.6, ease: 'expo.out', stagger: 0.03 });
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true }
  );

  return (
    <section className="section" id="work" ref={root}>
      <div className="container">
        <SectionHead index="03" label={tx.label} title={tx.title} aside={tx.aside} lang={lang} />

        <div className="cards">
          {featured.map((p, i) => (
            <a key={p.id} href={p.liveUrl} target="_blank" rel="noreferrer" className="card" data-cursor={tx.visit} data-reveal data-delay={(i % 2) * 0.1}>
              <div className="card__media">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="card__info">
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.description[lang]}</p>
                </div>
                <span className="card__go">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="card__tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
                <span className="tag tag--live">
                  <i /> {tx.status[p.status] || p.status}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="archive">
          <div className="archive__head" data-reveal>
            <h3>
              {tx.archive} <sup className="mono">{rest.length}</sup>
            </h3>
            <div className="filters" role="tablist">
              {Object.entries(tx.filters).map(([key, label]) => (
                <button key={key} role="tab" aria-selected={filter === key} className={filter === key ? 'is-active' : ''} onClick={() => setFilter(key)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <ul className="rows">
            {rest.map((p) => (
              <li key={p.id}>
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="row"
                >
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
