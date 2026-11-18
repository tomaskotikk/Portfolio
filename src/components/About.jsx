import { useRef } from 'react';
import { gsap, SplitText, useGSAP, reduced } from '../lib/motion';
import { projects, awards, techStack } from '../assets/data/portfolio';
import SectionHead from './SectionHead';
import { techClass } from '../lib/tech';

const t = {
  cs: {
    label: 'O mně',
    title: 'Stavím produkty, které fungují.',
    statement:
      'Jsem vývojář a student Creative Hill College ve Zlíně. Stavím weby pro skutečné klienty, full-stack aplikace nad databázemi i hry. Záleží mi na tom, aby byl produkt rychlý, přehledný a dělal přesně to, co má.',
    stats: [
      [`${projects.length}+`, 'Dokončených projektů'],
      ['3+', 'Klientských webů v provozu'],
      [String(awards.length), 'Ocenění v roce 2026'],
      ['3', 'Roky praxe'],
    ],
    stack: 'Technologie',
  },
  en: {
    label: 'About',
    title: 'I build products that work.',
    statement:
      "I'm a developer and student at Creative Hill College in Zlín. I build websites for real clients, full-stack apps on top of databases, and games. I care about products being fast, clear and doing exactly what they should.",
    stats: [
      [`${projects.length}+`, 'Shipped projects'],
      ['3+', 'Client websites in production'],
      [String(awards.length), 'Awards in 2026'],
      ['3', 'Years of practice'],
    ],
    stack: 'Stack',
  },
};

export default function About({ lang }) {
  const root = useRef(null);
  const tx = t[lang];

  useGSAP(
    () => {
      if (reduced) return;
      // Word-by-word scrubbed reveal of the statement
      const split = SplitText.create('.about__statement', { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.about__statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }
      );
      // Count-up stats
      gsap.utils.toArray('.stat__num').forEach((el) => {
        const end = parseInt(el.dataset.value, 10);
        const suffix = el.dataset.suffix || '';
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = Math.round(o.v) + suffix),
        });
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section className="section" id="about" ref={root}>
      <div className="container">
        <SectionHead index="01" label={tx.label} title={tx.title} lang={lang} />

        <div className="about__grid">
          <div className="about__photo" data-reveal>
            <img src="/Images/tomas-wide.jpg" alt="" loading="lazy" />
          </div>
          <p className="about__statement" key={lang}>
            {tx.statement}
          </p>
        </div>

        <div className="stats">
          {tx.stats.map(([value, label], i) => (
            <div className="stat" key={label} data-reveal data-delay={i * 0.08}>
              <span className="stat__num" data-value={parseInt(value, 10)} data-suffix={value.replace(/\d/g, '')}>
                {value}
              </span>
              <span className="stat__label">{label}</span>
            </div>
          ))}
        </div>

        <div className="stack">
          <span className="mono stack__title">{tx.stack}</span>
          <div className="stack__grid">
            {techStack.map((group) => (
              <div className="stack__group" key={group.category.en} data-reveal>
                <span className="mono">{group.category[lang]}</span>
                <ul>
                  {group.techs.map((tech) => (
                    <li key={tech.name}>
                      <img src={tech.icon} alt="" width="16" height="16" loading="lazy" className={techClass(tech.name)} />
                      {tech.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
