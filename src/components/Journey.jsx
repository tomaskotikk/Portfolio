import { useRef } from 'react';
import { ArrowUpRight, Award, Briefcase, Building2, Gamepad2, GraduationCap, Trophy } from 'lucide-react';
import { academic } from '../assets/data/portfolio';
import { gsap, useGSAP, reduced } from '../lib/motion';
import SectionHead from './SectionHead';

const icons = { trophy: Trophy, game: Gamepad2, company: Building2, award: Award, work: Briefcase, school: GraduationCap };

const t = {
  cs: {
    label: 'Zkušenosti & vzdělání',
    title: 'Moje cesta',
    now: 'Teď',
    items: [
      {
        icon: 'game',
        when: '2026 – teď',
        what: 'Aurio Studio',
        where: 'Naše malé herní studio',
        desc: 'S kamarády vyvíjíme multiplayerovou párty hru Curling with your Friends v Unity. Mám na starosti gameplay, fyziku ledu a nástroje.',
        tags: ['Unity 6', 'C#', 'Steam'],
        link: 'https://aurio.studio',
        current: true,
      },
      {
        icon: 'trophy',
        when: '2026',
        what: 'AT&T Hackathony',
        where: 'Brno · online',
        desc: 'Digitální dvojník Brna Urbia: 2. místo a Nejlepší technické řešení na Hackathon Junior 2026. K tomu 2. místo na Hackathon Online 2026.',
        tags: ['2× 2. místo', 'Nejlepší tech. řešení'],
      },
      {
        icon: 'company',
        when: '2026',
        what: 'Monet+',
        where: 'Firemní praxe',
        desc: 'Dvoutýdenní praxe ve firmě, která dělá bezpečnostní a platební řešení pro banky. Práce v týmu na reálném kódu.',
        tags: ['Praxe', 'Tým'],
      },
      {
        icon: 'award',
        when: '2025',
        what: 'Odborná praxe',
        where: 'Ocenění „Firma roku“',
        desc: 'Praxe v roce 2025 byla hodnocena jako Firma roku.',
        tags: ['Ocenění'],
      },
      {
        icon: 'work',
        when: '2024 – teď',
        what: 'Klientské weby',
        where: 'Freelance',
        desc: 'Číž Barber, Ateliér Rosaline, La Anné, Žabčíková – Účetnictví a Rugby Kemp. Od prvního návrhu po nasazení a správu.',
        tags: ['Next.js', 'Supabase', '5 klientů'],
      },
      {
        icon: 'school',
        when: academic.period.cs,
        what: academic.institution.cs,
        where: academic.major.cs,
        desc: 'OOP a algoritmy, návrh databází a SQL, webové aplikace v Reactu a Node.js.',
        tags: ['Java', 'SQL', 'React'],
      },
    ],
  },
  en: {
    label: 'Experience & education',
    title: 'My journey',
    now: 'Now',
    items: [
      {
        icon: 'game',
        when: '2026 – now',
        what: 'Aurio Studio',
        where: 'Our small game studio',
        desc: 'Together with friends we are building Curling with your Friends, a multiplayer party game in Unity. I handle gameplay, ice physics and tooling.',
        tags: ['Unity 6', 'C#', 'Steam'],
        link: 'https://aurio.studio',
        current: true,
      },
      {
        icon: 'trophy',
        when: '2026',
        what: 'AT&T Hackathons',
        where: 'Brno · online',
        desc: 'Urbia, a digital twin of Brno: 2nd Place and Best Technical Solution at Hackathon Junior 2026. Plus 2nd Place at Hackathon Online 2026.',
        tags: ['2× 2nd place', 'Best tech solution'],
      },
      {
        icon: 'company',
        when: '2026',
        what: 'Monet+',
        where: 'Company internship',
        desc: 'Two-week internship at a company building security and payment solutions for banks. Teamwork on real code.',
        tags: ['Internship', 'Team'],
      },
      {
        icon: 'award',
        when: '2025',
        what: 'Professional internship',
        where: '“Company of the Year” recognition',
        desc: 'The 2025 internship was recognized as Company of the Year.',
        tags: ['Award'],
      },
      {
        icon: 'work',
        when: '2024 – now',
        what: 'Client websites',
        where: 'Freelance',
        desc: 'Číž Barber, Ateliér Rosaline, La Anné, Žabčíková Accounting and Rugby Camp. From the first draft to deployment and upkeep.',
        tags: ['Next.js', 'Supabase', '5 clients'],
      },
      {
        icon: 'school',
        when: academic.period.en,
        what: academic.institution.en,
        where: academic.major.en,
        desc: 'OOP and algorithms, database design and SQL, web applications in React and Node.js.',
        tags: ['Java', 'SQL', 'React'],
      },
    ],
  },
};

export default function Journey({ lang }) {
  const tx = t[lang];
  const root = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        '.tl__fill',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.tl', start: 'top 70%', end: 'bottom 60%', scrub: true } }
      );
      gsap.utils.toArray('.tl__item').forEach((el) => {
        gsap.from(el.querySelector('.tl__card'), {
          x: 30,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
        gsap.to(el, { scrollTrigger: { trigger: el, start: 'top 60%', toggleClass: 'is-on', once: true } });
      });
    },
    { scope: root, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <section className="section" id="journey" ref={root}>
      <div className="container">
        <SectionHead index="04" label={tx.label} title={tx.title} lang={lang} />
        <ol className="tl">
          <span className="tl__rail" aria-hidden="true">
            <span className="tl__fill" />
          </span>
          {tx.items.map((it) => {
            const Icon = icons[it.icon];
            return (
              <li key={it.what} className={`tl__item${it.current ? ' is-current' : ''}`}>
                <span className="tl__dot">
                  <Icon size={16} />
                </span>
                <span className="tl__when mono">{it.when}</span>
                <div className="tl__card">
                  <div className="tl__head">
                    <div>
                      <h3>
                        {it.what}
                        {it.current && <span className="tl__now mono">{tx.now}</span>}
                      </h3>
                      <span className="tl__where">{it.where}</span>
                    </div>
                    {it.link && (
                      <a href={it.link} target="_blank" rel="noreferrer" className="icon-btn icon-btn--sm" aria-label={it.what}>
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                  <p>{it.desc}</p>
                  <div className="card__tags">
                    {it.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
