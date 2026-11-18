import { useRef } from 'react';
import { Briefcase, Clock3, FolderGit2, GraduationCap, Layers, MapPin, Rocket, Trophy, User } from 'lucide-react';
import { gsap, SplitText, useGSAP, reduced } from '../lib/motion';
import { projects, awards, techStack, academic } from '../assets/data/portfolio';
import { techClass } from '../lib/tech';
import SectionHead from './SectionHead';

const t = {
  cs: {
    label: 'O mně',
    title: 'Stavím produkty,',
    highlight: 'které fungují.',
    statement:
      'Jsem vývojář a student Creative Hill College ve Zlíně. Stavím weby pro skutečné klienty, full-stack aplikace nad databázemi i hry. Záleží mi na tom, aby byl produkt rychlý, přehledný a dělal přesně to, co má.',
    stats: [
      [FolderGit2, `${projects.length}+`, 'Dokončených projektů'],
      [Briefcase, '3+', 'Klientských webů'],
      [Trophy, String(awards.length), 'Ocenění v roce 2026'],
      [Clock3, '3', 'Roky praxe'],
    ],
    school: 'Studium',
    based: 'Lokalita',
    basedVal: 'Zlín, Česká republika',
    now: 'Aktuálně',
    nowVal: 'Hledám stáž a zajímavé projekty',
    avail: 'K dispozici',
    stack: 'Technologie, se kterými pracuji',
  },
  en: {
    label: 'About',
    title: 'I build products',
    highlight: 'that work.',
    statement:
      "I'm a developer and student at Creative Hill College in Zlín. I build websites for real clients, full-stack apps on top of databases, and games. I care about products being fast, clear and doing exactly what they should.",
    stats: [
      [FolderGit2, `${projects.length}+`, 'Shipped projects'],
      [Briefcase, '3+', 'Client websites'],
      [Trophy, String(awards.length), 'Awards in 2026'],
      [Clock3, '3', 'Years of practice'],
    ],
    school: 'Education',
    based: 'Based in',
    basedVal: 'Zlín, Czech Republic',
    now: 'Currently',
    nowVal: 'Looking for an internship and interesting projects',
    avail: 'Available',
    stack: 'Technologies I work with',
  },
};

export default function About({ lang }) {
  const root = useRef(null);
  const tx = t[lang];

  useGSAP(
    () => {
      if (reduced) return;
      const split = SplitText.create('.bento__statement', { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.bento__statement', start: 'top 82%', end: 'bottom 50%', scrub: true },
        }
      );
      gsap.utils.toArray('.stat__num').forEach((el) => {
        const end = parseInt(el.dataset.value, 10);
        const suffix = el.dataset.suffix || '';
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => (el.textContent = Math.round(o.v) + suffix),
        });
      });
      gsap.from('.stack-chip', {
        y: 16,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'expo.out',
        stagger: 0.025,
        scrollTrigger: { trigger: '.bento__stack', start: 'top 85%', once: true },
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section className="section" id="about" ref={root}>
      <div className="container">
        <SectionHead icon={User} label={tx.label} title={tx.title} highlight={tx.highlight} lang={lang} />

        <div className="bento">
          <div className="tile spot bento__intro" data-reveal>
            <p className="bento__statement" key={lang}>
              {tx.statement}
            </p>
          </div>

          <div className="tile spot bento__photo" data-reveal data-delay="0.1">
            <img src="/Images/tomas-wide.jpg" alt="Tomáš Kotík v Praze" loading="lazy" />
          </div>

          {tx.stats.map(([Icon, value, label], i) => (
            <div className="tile spot stat" key={label} data-reveal data-delay={i * 0.06}>
              <span className="tile__icon">
                <Icon size={18} />
              </span>
              <span className="stat__num" data-value={parseInt(value, 10)} data-suffix={value.replace(/\d/g, '')}>
                {value}
              </span>
              <span className="stat__label">{label}</span>
            </div>
          ))}

          <div className="tile spot bento__info" data-reveal>
            <span className="tile__icon">
              <GraduationCap size={18} />
            </span>
            <span className="tile__label">{tx.school}</span>
            <strong>{academic.institution[lang]}</strong>
            <small>{academic.major[lang]}</small>
          </div>
          <div className="tile spot bento__info" data-reveal data-delay="0.06">
            <span className="tile__icon">
              <MapPin size={18} />
            </span>
            <span className="tile__label">{tx.based}</span>
            <strong>{tx.basedVal}</strong>
            <small>CET · UTC+1</small>
          </div>
          <div className="tile spot bento__info bento__info--accent" data-reveal data-delay="0.12">
            <span className="tile__icon">
              <Rocket size={18} />
            </span>
            <span className="tile__label">{tx.now}</span>
            <strong>{tx.nowVal}</strong>
            <small className="status">
              <i /> {tx.avail}
            </small>
          </div>

          <div className="tile spot bento__stack" data-reveal>
            <div className="bento__stack-head">
              <span className="tile__icon">
                <Layers size={18} />
              </span>
              <span className="tile__label">{tx.stack}</span>
            </div>
            <div className="stack-groups">
              {techStack.map((group) => (
                <div className="stack-group" key={group.category.en}>
                  <span className="stack-group__name">{group.category[lang]}</span>
                  <div className="stack-group__chips">
                    {group.techs.map((tech) => (
                      <span className="stack-chip" key={tech.name}>
                        <img src={tech.icon} alt="" width="18" height="18" loading="lazy" className={techClass(tech.name)} />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
