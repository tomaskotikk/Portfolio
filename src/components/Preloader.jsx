import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/motion';

export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);
  const num = useRef(null);

  useGSAP(
    () => {
      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete: onDone });
      tl.from('.pl-name span', { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.06 })
        .to(
          counter,
          {
            v: 100,
            duration: 1.5,
            ease: 'power3.inOut',
            onUpdate: () => {
              if (num.current) num.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0
        )
        .to('.pl-bar i', { scaleX: 1, duration: 1.5, ease: 'power3.inOut' }, 0)
        .to('.pl-inner', { y: -40, autoAlpha: 0, duration: 0.5, ease: 'power2.in' })
        .call(onReveal)
        .to(root.current, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '<');
    },
    { scope: root }
  );

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pl-inner">
        <div className="pl-name">
          <span>Tomáš</span> <span>Kotík</span>
        </div>
        <div className="pl-meta">
          <span className="mono">Full-stack developer</span>
          <span className="mono" ref={num}>
            000
          </span>
        </div>
        <div className="pl-bar">
          <i />
        </div>
      </div>
    </div>
  );
}
