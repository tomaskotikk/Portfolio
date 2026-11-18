import { useRef } from 'react';
import { Award, Briefcase, Building2, GraduationCap, Route, Trophy } from 'lucide-react';
import { academic } from '../assets/data/portfolio';
import { gsap, useGSAP, reduced } from '../lib/motion';
import SectionHead from './SectionHead';

const t = {
  cs: {
    label: 'Zkušenosti',
    title: 'Moje',
    highlight: 'cesta.',
    items: [
      [Trophy, '2026', 'AT&T Hackathony', 'Brno · online', '2. místo a Nejlepší technické řešení na Hackathon Junior 2026, 2. místo na Hackathon Online 2026.'],
      [Building2, 'Praxe', 'Monet+', 'Firemní praxe', 'Dvoutýdenní praxe ve firmě Monet+.'],
      [Award, '2025', 'Odborná praxe', 'Ocenění „Firma roku“', 'Praxe v roce 2025 byla hodnocena jako Firma roku.'],
      [Briefcase, 'Freelance', 'Klientské weby', 'Zlín a okolí', 'Weby pro Kostkopark, Žabčíková – Účetnictví a Rugby Kemp — od návrhu po nasazení.'],
      [GraduationCap, academic.period.cs, academic.institution.cs, academic.major.cs, 'OOP a algoritmy, návrh databází a SQL, webové aplikace v Reactu a Node.js.'],
    ],
  },
  en: {
    label: 'Experience',
    title: 'My',
    highlight: 'journey.',
    items: [
      [Trophy, '2026', 'AT&T Hackathons', 'Brno · online', '2nd Place and Best Technical Solution at Hackathon Junior 2026, 2nd Place at Hackathon Online 2026.'],
      [Building2, 'Internship', 'Monet+', 'Company internship', 'Two-week internship at Monet+.'],
      [Award, '2025', 'Professional internship', '“Company of the Year” recognition', 'The 2025 internship was recognized as Company of the Year.'],
      [Briefcase, 'Freelance', 'Client websites', 'Zlín region', 'Websites for Kostkopark, Žabčíková Accounting and Rugby Camp — from design to deployment.'],
      [GraduationCap, academic.period.en, academic.institution.en, academic.major.en, 'OOP and algorithms, database design and SQL, web applications in React and Node.js.'],
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
        '.timeline__progress',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } }
      );
      gsap.utils.toArray('.timeline__node').forEach((node) => {
        gsap.from(node, { scale: 0, duration: 0.6, ease: 'back.out(2)', scrollTrigger: { trigger: node, start: 'top 75%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section className="section" id="journey" ref={root}>
      <div className="container">
        <SectionHead icon={Route} label={tx.label} title={tx.title} highlight={tx.highlight} lang={lang} />
        <ol className="timeline">
          <span className="timeline__line" aria-hidden="true">
            <span className="timeline__progress" />
          </span>
          {tx.items.map(([Icon, when, what, where, desc], i) => (
            <li key={what} data-reveal data-delay={i * 0.04}>
              <span className="timeline__node">
                <Icon size={18} />
              </span>
              <div className="tile spot timeline__card">
                <span className="timeline__when">{when}</span>
                <h3>{what}</h3>
                <span className="timeline__where">{where}</span>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
