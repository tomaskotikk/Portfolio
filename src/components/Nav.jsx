import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, scrollTo } from '../lib/motion';
import Magnetic from './Magnetic';
import { Mail } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { personal } from '../assets/data/portfolio';

const links = {
  cs: [
    ['O mně', '#about'],
    ['Ocenění', '#awards'],
    ['Projekty', '#work'],
    ['Zkušenosti', '#journey'],
  ],
  en: [
    ['About', '#about'],
    ['Awards', '#awards'],
    ['Work', '#work'],
    ['Experience', '#journey'],
  ],
};

export default function Nav({ lang, setLang, ready, onNavigate }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.from(ref.current, { y: -30, autoAlpha: 0, duration: 1, ease: 'expo.out', delay: 0.5, clearProps: 'transform' });
      // Hide on scroll down, show on scroll up
      ScrollTrigger.create({
        start: 'top -120',
        onUpdate: (self) => {
          ref.current?.classList.toggle('nav--hidden', self.direction === 1 && self.scroll() > 400);
          ref.current?.classList.toggle('nav--solid', self.scroll() > 40);
        },
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
    if (onNavigate) onNavigate(typeof href === 'string' ? href : null);
    else scrollTo(href);
  };

  return (
    <>
      <header className="nav" ref={ref}>
        <a href="#top" className="nav__logo" onClick={(e) => go(e, 0)} aria-label="Tomáš Kotík — home">
          <span className="nav__mark">TK</span>
          <span className="nav__name">Tomáš Kotík</span>
        </a>

        <nav className="nav__links" aria-label="Main">
          {links[lang].map(([label, href], i) => (
            <a key={href} href={href} onClick={(e) => go(e, href)}>
              <span className="mono">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <a href={personal.links.github} target="_blank" rel="noreferrer" className="icon-btn icon-btn--sm nav__gh" aria-label="GitHub">
            <GithubIcon size={16} />
          </a>
          <div className="lang" role="group" aria-label="Language">
            {['cs', 'en'].map((l) => (
              <button key={l} className={lang === l ? 'is-active' : ''} onClick={() => setLang(l)} aria-pressed={lang === l}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Magnetic>
            <a href="#contact" className="btn btn--sm" onClick={(e) => go(e, '#contact')}>
              <Mail size={15} />
              {lang === 'cs' ? 'Napište mi' : "Let's talk"}
            </a>
          </Magnetic>
          <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav>
          {[...links[lang], [lang === 'cs' ? 'Kontakt' : 'Contact', '#contact']].map(([label, href], i) => (
            <a key={href} href={href} onClick={(e) => go(e, href)} style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}>
              <span className="mono">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
