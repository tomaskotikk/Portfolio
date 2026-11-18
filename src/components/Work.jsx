import { useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Briefcase, ExternalLink, FolderOpen, GraduationCap, LayoutGrid, Smile } from 'lucide-react';
import { projects } from '../assets/data/portfolio';
import { gsap, useGSAP, reduced, ScrollTrigger } from '../lib/motion';
import { GithubIcon } from './BrandIcons';
import SectionHead from './SectionHead';
import HoverPreview from './HoverPreview';

const t = {
  cs: {
    label: 'Projekty',
    title: 'Vybraná',
    highlight: 'práce.',
    lead: 'Weby pro firmy ve Zlíně, full-stack aplikace i hry. Najetím zobrazíte náhled.',
    archive: 'Další projekty',
    filters: { all: 'Vše', client: 'Klienti', school: 'Škola', fun: 'Osobní' },
    cat: { client: 'Klient', school: 'Škola', fun: 'Osobní' },
    live: 'Web',
    code: 'Kód',
    status: { Deployed: 'Live', Developing: 'Ve vývoji' },
  },
  en: {
    label: 'Work',
    title: 'Selected',
    highlight: 'work.',
    lead: 'Websites for local businesses, full-stack apps and games. Hover to preview.',
    archive: 'More projects',
    filters: { all: 'All', client: 'Clients', school: 'School', fun: 'Personal' },
    cat: { client: 'Client', school: 'School', fun: 'Personal' },
    live: 'Website',
    code: 'Code',
    status: { Deployed: 'Live', Developing: 'In progress' },
  },
};

const catIcon = { client: Briefcase, school: GraduationCap, fun: Smile, all: LayoutGrid };
const featuredOrder = [1, 3, 2, 4];
const isGithub = (url) => url.includes('github.com');

export default function Work({ lang }) {
  const tx = t[lang];
  const root = useRef(null);
  const preview = useRef(null);
  const [filter, setFilter] = useState('all');

  const featured = featuredOrder.map((id) => projects.find((p) => p.id === id));
  const rest = useMemo(() => projects.filter((p) => !p.featured && (filter === 'all' || p.category === filter)), [filter]);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray('.card__media img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }
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
        <SectionHead icon={FolderOpen} label={tx.label} title={tx.title} highlight={tx.highlight} lead={tx.lead} lang={lang} />

        <div className="cards">
          {featured.map((p, i) => {
            const Cat = catIcon[p.category];
            return (
              <a key={p.id} href={p.liveUrl} target="_blank" rel="noreferrer" className="tile spot card" data-cursor={tx.live} data-reveal data-delay={(i % 2) * 0.1}>
                <div className="card__media">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <span className="card__status">
                    <i /> {tx.status[p.status] || p.status}
                  </span>
                </div>
                <div className="card__body">
                  <div className="card__top">
                    <span className="card__cat">
                      <Cat size={14} /> {tx.cat[p.category]}
                    </span>
                    <span className="card__go">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description[lang]}</p>
                  <div className="card__tags">
                    {p.tags.slice(1).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="archive">
          <div className="archive__head" data-reveal>
            <h3>
              {tx.archive} <span className="count">{rest.length}</span>
            </h3>
            <div className="filters" role="tablist">
              {Object.entries(tx.filters).map(([key, label]) => {
                const Icon = catIcon[key];
                return (
                  <button key={key} role="tab" aria-selected={filter === key} className={filter === key ? 'is-active' : ''} onClick={() => setFilter(key)}>
                    <Icon size={14} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="rows" onPointerLeave={() => preview.current?.hide()}>
            {rest.map((p) => {
              const Cat = catIcon[p.category];
              const gh = isGithub(p.liveUrl);
              return (
                <li key={p.id}>
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="row" onPointerEnter={() => preview.current?.show(p.image)}>
                    <span className="row__icon">
                      <Cat size={18} />
                    </span>
                    <span className="row__title">
                      {p.title}
                      <small>{p.description[lang]}</small>
                    </span>
                    <span className="row__tags">
                      {p.tags.slice(1).map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </span>
                    <img className="row__thumb" src={p.image} alt="" loading="lazy" />
                    <span className="row__link">
                      {gh ? <GithubIcon size={15} /> : <ExternalLink size={15} />}
                      {gh ? tx.code : tx.live}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <HoverPreview ref={preview} />
        </div>
      </div>
    </section>
  );
}
