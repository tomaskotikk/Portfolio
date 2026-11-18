import { useEffect, useRef, useState } from 'react';
import { Award, FolderOpen, Mail, Route, User, Wrench } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP, scrollTo } from '../lib/motion';
import Magnetic from './Magnetic';

const links = {
  cs: [
    [User, 'O mně', '#about'],
    [Wrench, 'Služby', '#services'],
    [Award, 'Ocenění', '#awards'],
    [FolderOpen, 'Projekty', '#work'],
    [Route, 'Cesta', '#journey'],
  ],
  en: [
    [User, 'About', '#about'],
    [Wrench, 'Services', '#services'],
    [Award, 'Awards', '#awards'],
    [FolderOpen, 'Work', '#work'],
    [Route, 'Journey', '#journey'],
  ],
};

export default function Nav({ lang, setLang, ready }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useGSAP(
    () => {
      if (!ready) return;
      gsap.from('.nav__bar', { y: -30, autoAlpha: 0, duration: 1, ease: 'expo.out', delay: 0.4 });
      ScrollTrigger.create({
        start: 'top -120',
        onUpdate: (self) => {
          ref.current?.classList.toggle('nav--hidden', self.direction === 1 && self.scroll() > 500);
        },
      });
      ['#about', '#services', '#awards', '#work', '#journey', '#contact'].forEach((id) => {
        ScrollTrigger.create({
          trigger: id,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => self.isActive && setActive(id),
        });
      });
    },
    { dependencies: [ready] }
  );

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
  }, [open]);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header className="nav" ref={ref}>
        <div className="nav__bar">
          <a href="#top" className="nav__logo" onClick={(e) => go(e, 0)} aria-label="Tomáš Kotík — home">
            <span className="nav__mark">TK</span>
          </a>

          <nav className="nav__links" aria-label="Main">
            {links[lang].map(([Icon, label, href]) => (
              <a key={href} href={href} onClick={(e) => go(e, href)} className={active === href ? 'is-active' : ''}>
                <Icon size={15} />
                {label}
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <div className="lang" role="group" aria-label="Language">
              {['cs', 'en'].map((l) => (
                <button key={l} className={lang === l ? 'is-active' : ''} onClick={() => setLang(l)} aria-pressed={lang === l}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Magnetic>
              <a href="#contact" className="btn btn--primary btn--sm" onClick={(e) => go(e, '#contact')}>
                <Mail size={15} />
                {lang === 'cs' ? 'Kontakt' : 'Contact'}
              </a>
            </Magnetic>
            <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
              <i />
              <i />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav>
          {[...links[lang], [Mail, lang === 'cs' ? 'Kontakt' : 'Contact', '#contact']].map(([Icon, label, href], i) => (
            <a key={href} href={href} onClick={(e) => go(e, href)} style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}>
              <span className="menu__icon">
                <Icon size={20} />
              </span>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
