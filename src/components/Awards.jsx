import { ArrowUpRight, Cpu, Medal, Trophy } from 'lucide-react';
import { awards } from '../assets/data/portfolio';
import SectionHead from './SectionHead';

const t = {
  cs: {
    label: 'Ocenění',
    title: 'Uznání, které mluví za mě.',
    aside: 'Tři umístění z hackathonů AT&T v roce 2026 — včetně ceny za nejlepší technické řešení.',
    view: 'Zobrazit certifikát',
  },
  en: {
    label: 'Recognition',
    title: 'Recognition that speaks for itself.',
    aside: 'Three placements at AT&T hackathons in 2026 — including the award for the best technical solution.',
    view: 'View certificate',
  },
};

const icons = { 'hj-2nd': Medal, 'hj-tech': Cpu, 'ho-2nd': Trophy };

export default function Awards({ lang }) {
  const tx = t[lang];

  return (
    <section className="section" id="awards">
      <div className="container">
        <SectionHead index="02" label={tx.label} title={tx.title} aside={tx.aside} lang={lang} />

        <ul className="certs">
          {awards.map((a, i) => {
            const Icon = icons[a.id] || Trophy;
            return (
              <li key={a.id} className="cert" data-reveal data-delay={i * 0.08}>
                <a href={a.image} target="_blank" rel="noreferrer" className="cert__media" aria-label={`${tx.view}: ${a.title[lang]} — ${a.event}`}>
                  <img src={a.image} alt={`${a.event} — ${a.title[lang]}`} loading="lazy" />
                </a>
                <div className="cert__body">
                  <span className={`row__badge ${a.id === 'hj-tech' ? 'is-tech' : ''}`}>
                    <Icon size={16} />
                  </span>
                  <div>
                    <h3>{a.title[lang]}</h3>
                    <p>{a.event}</p>
                    <small>
                      {a.org} · {a.place[lang]}
                    </small>
                  </div>
                </div>
                <a href={a.image} target="_blank" rel="noreferrer" className="cert__link">
                  {tx.view}
                  <ArrowUpRight size={14} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
