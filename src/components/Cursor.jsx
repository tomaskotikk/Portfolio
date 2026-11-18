import { useEffect, useRef, useState } from 'react';
import { gsap, finePointer, reduced } from '../lib/motion';

/** Minimal dot cursor that grows into a labelled disc over [data-cursor] elements. */
export default function Cursor() {
  const dot = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!finePointer || reduced) return;
    document.documentElement.classList.add('has-cursor');
    const xTo = gsap.quickTo(dot.current, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(dot.current, 'y', { duration: 0.35, ease: 'power3' });

    let shown = false;
    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.set(dot.current, { x: e.clientX, y: e.clientY });
        gsap.to(dot.current, { autoAlpha: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const target = e.target.closest('[data-cursor], a, button, input, textarea');
      const el = dot.current;
      if (!el) return;
      el.classList.toggle('is-link', !!target && !target.dataset.cursor);
      el.classList.toggle('is-label', !!target?.dataset.cursor);
      setLabel(target?.dataset.cursor || '');
    };
    const leave = () => gsap.to(dot.current, { autoAlpha: 0, duration: 0.2 });
    const enter = () => gsap.to(dot.current, { autoAlpha: 1, duration: 0.2 });

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    document.documentElement.addEventListener('pointerenter', enter);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      document.documentElement.removeEventListener('pointerenter', enter);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  if (!finePointer || reduced) return null;
  return (
    <div className="cursor" ref={dot} aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
