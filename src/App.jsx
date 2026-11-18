import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, SplitText, useGSAP, initLenis, getLenis, reduced } from './lib/motion';

import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Awards from './components/Awards';
import Work from './components/Work';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';

const readSeen = () => {
  try {
    return sessionStorage.getItem('tk-intro') === '1';
  } catch {
    return false;
  }
};

const readLang = () => {
  try {
    return localStorage.getItem('tk-lang') || 'cs';
  } catch {
    return 'cs';
  }
};

export default function App() {
  const skipIntro = reduced || readSeen();
  const [ready, setReady] = useState(skipIntro);
  const [preloader, setPreloader] = useState(!skipIntro);
  const [lang, setLang] = useState(readLang);
  const root = useRef(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('tk-lang', lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  useEffect(() => {
    const lenis = initLenis();
    if (!ready) lenis?.stop();
    else lenis?.start();
  }, [ready]);

  // Global scroll reveals: [data-reveal] fades up, [data-split] reveals line by line
  useGSAP(
    () => {
      if (!ready || reduced) return;

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: 'expo.out',
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray('[data-split]').forEach((el) => {
        const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      gsap.utils.toArray('[data-line]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });

      ScrollTrigger.refresh();
    },
    // Elements with [data-split] carry key={lang}, so a language switch remounts them as plain text.
    { scope: root, dependencies: [ready] }
  );

  const handleReveal = () => {
    try {
      sessionStorage.setItem('tk-intro', '1');
    } catch {
      /* ignore */
    }
    setReady(true);
    getLenis()?.start();
  };

  return (
    <div ref={root}>
      <div className="grain" aria-hidden="true" />
      {preloader && <Preloader onReveal={handleReveal} onDone={() => setPreloader(false)} />}
      <Cursor />
      <Nav lang={lang} setLang={setLang} ready={ready} />
      <main>
        <Hero lang={lang} ready={ready} />
        <Marquee />
        <About lang={lang} />
        <Awards lang={lang} />
        <Work lang={lang} />
        <Journey lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
