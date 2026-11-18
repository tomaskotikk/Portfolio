import { Database, Gamepad2, Globe, LayoutDashboard, Wrench } from 'lucide-react';
import SectionHead from './SectionHead';

const t = {
  cs: {
    label: 'Co dělám',
    title: 'Od nápadu',
    highlight: 'po nasazení.',
    items: [
      [Globe, 'Weby na míru', 'Rychlé, responzivní prezentace pro firmy a projekty — s důrazem na čistý design a snadnou správu.', ['React', 'Next.js', 'Tailwind']],
      [LayoutDashboard, 'Webové aplikace', 'Full-stack aplikace s přihlášením, rolemi a přehlednými dashboardy pro každodenní práci.', ['React', 'Node.js', 'Supabase']],
      [Database, 'Backend a databáze', 'Návrh databází, REST API a logika na serveru, která drží data v pořádku.', ['SQL', 'Express', 'Spring Boot']],
      [Gamepad2, 'Hry a interaktivita', '2D i 3D hry v Unity a interaktivní prvky do prohlížeče.', ['Unity', 'C#', 'JavaScript']],
    ],
  },
  en: {
    label: 'What I do',
    title: 'From idea',
    highlight: 'to production.',
    items: [
      [Globe, 'Custom websites', 'Fast, responsive websites for businesses and projects — clean design that is easy to manage.', ['React', 'Next.js', 'Tailwind']],
      [LayoutDashboard, 'Web applications', 'Full-stack apps with authentication, roles and clear dashboards for everyday work.', ['React', 'Node.js', 'Supabase']],
      [Database, 'Backend & databases', 'Database design, REST APIs and server-side logic that keeps data in order.', ['SQL', 'Express', 'Spring Boot']],
      [Gamepad2, 'Games & interactivity', '2D and 3D games in Unity and interactive features for the browser.', ['Unity', 'C#', 'JavaScript']],
    ],
  },
};

export default function Services({ lang }) {
  const tx = t[lang];
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead icon={Wrench} label={tx.label} title={tx.title} highlight={tx.highlight} lang={lang} />
        <div className="services">
          {tx.items.map(([Icon, title, desc, tags], i) => (
            <article className="tile spot service" key={title} data-reveal data-delay={i * 0.08}>
              <span className="service__no">0{i + 1}</span>
              <span className="service__icon">
                <Icon size={24} strokeWidth={1.8} />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="service__tags">
                {tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
