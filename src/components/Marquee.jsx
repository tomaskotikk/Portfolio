import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, reduced } from '../lib/motion';
import { techStack } from '../assets/data/portfolio';
import { techClass } from '../lib/tech';

const items = techStack.flatMap((g) => g.techs).filter((t) => !['HTML', 'CSS', 'Git', 'VS Code', 'GitHub'].includes(t.name));

/** Infinite tech-stack ticker whose speed and direction react to scroll velocity. */
export default function Marquee() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      const loop = gsap.to('.marquee__track', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity() / 300;
          gsap.to(loop, { timeScale: self.direction * Math.max(1, Math.abs(v)), duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.2, overwrite: false });
        },
      });
    },
    { scope: root }
  );

  const row = (k) => items.map((it) => (
    <span key={k + it.name} className="marquee__item">
      <img src={it.icon} alt="" width="26" height="26" loading="lazy" className={techClass(it.name)} />
      {it.name}
      <i aria-hidden="true">✦</i>
    </span>
  ));

  return (
    <div className="marquee" ref={root} aria-label={items.map((i) => i.name).join(', ')}>
      <div className="marquee__track" aria-hidden="true">
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}
