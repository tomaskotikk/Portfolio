import { Award, Briefcase, Building2, GraduationCap, Trophy } from 'lucide-react';
import { academic } from '../assets/data/portfolio';

const icons = [Trophy, Building2, Award, Briefcase, GraduationCap];
import SectionHead from './SectionHead';

const t = {
  cs: {
    label: 'Zkušenosti & vzdělání',
    title: 'Cesta zatím.',
    items: [
      {
        when: '2026',
        what: 'AT&T Hackathony',
        where: 'Brno · online',
        desc: '2. místo a Nejlepší technické řešení na Hackathon Junior 2026, 2. místo na Hackathon Online 2026.',
      },
      {
        when: 'Praxe',
        what: 'Monet+',
        where: 'Firemní praxe',
        desc: 'Dvoutýdenní praxe ve firmě Monet+.',
      },
      {
        when: '2025',
        what: 'Odborná praxe',
        where: 'Ocenění „Firma roku“',
        desc: 'Praxe v roce 2025 byla hodnocena jako Firma roku.',
      },
      {
        when: 'Freelance',
        what: 'Klientské weby',
        where: 'Zlín a okolí',
        desc: 'Weby pro Kostkopark, Žabčíková – Účetnictví a Rugby Kemp — od návrhu po nasazení.',
      },
      {
        when: academic.period.cs,
        what: academic.institution.cs,
        where: academic.major.cs,
        desc: 'OOP a algoritmy, návrh databází a SQL, webové aplikace v Reactu a Node.js.',
      },
    ],
  },
  en: {
    label: 'Experience & education',
    title: 'The journey so far.',
    items: [
      {
        when: '2026',
        what: 'AT&T Hackathons',
        where: 'Brno · online',
        desc: '2nd Place and Best Technical Solution at Hackathon Junior 2026, 2nd Place at Hackathon Online 2026.',
      },
      {
        when: 'Internship',
        what: 'Monet+',
        where: 'Company internship',
        desc: 'Two-week internship at Monet+.',
      },
      {
        when: '2025',
        what: 'Professional internship',
        where: '“Company of the Year” recognition',
        desc: 'The 2025 internship was recognized as Company of the Year.',
      },
      {
        when: 'Freelance',
        what: 'Client websites',
        where: 'Zlín region',
        desc: 'Websites for Kostkopark, Žabčíková Accounting and Rugby Camp — from design to deployment.',
      },
      {
        when: academic.period.en,
        what: academic.institution.en,
        where: academic.major.en,
        desc: 'OOP and algorithms, database design and SQL, web applications in React and Node.js.',
      },
    ],
  },
};

export default function Journey({ lang }) {
  const tx = t[lang];
  return (
    <section className="section" id="journey">
      <div className="container">
        <SectionHead index="04" label={tx.label} title={tx.title} lang={lang} />
        <ol className="journey">
          {tx.items.map((it, i) => (
            <li key={it.what} data-reveal data-delay={i * 0.05}>
              <span className="mono journey__when">
                <span className="journey__icon">
                  {(() => {
                    const Icon = icons[i];
                    return <Icon size={16} />;
                  })()}
                </span>
                {it.when}
              </span>
              <div className="journey__what">
                <h3>{it.what}</h3>
                <span>{it.where}</span>
              </div>
              <p>{it.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
