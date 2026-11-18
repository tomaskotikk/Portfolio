import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, reduced } from '../lib/motion';
import { techStack } from '../assets/data/portfolio';
import { techClass } from '../lib/tech';

const items = techStack.flatMap((g) => g.techs);

/** Infinite logo ticker whose speed and direction react to scroll velocity. */
export default function Marquee() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (reduced) return;
      const loop = gsap.to('.marquee__track', { xPercent: -50, duration: 45, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = Math.abs(self.getVelocity() / 250);
          gsap.to(loop, { timeScale: self.direction * Math.max(1, v), duration: 0.2, overwrite: true });
          gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.2, overwrite: false });
        },
      });
    },
    { scope: root }
  );

  const row = (k) =>
    items.map((it) => (
      <span key={k + it.name} className="marquee__item">
        <img src={it.icon} alt="" width="28" height="28" loading="lazy" className={techClass(it.name)} />
        {it.name}
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
