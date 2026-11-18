import { useEffect, useRef, useState } from 'react';
import { gsap, finePointer, reduced } from '../lib/motion';

/** Dot + trailing ring cursor; grows into a labelled disc over [data-cursor] elements. */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (!finePointer || reduced) return;
    document.documentElement.classList.add('has-cursor');
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' });

    let shown = false;
    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e) => {
      const target = e.target.closest('[data-cursor], a, button, input, textarea');
      ring.current?.classList.toggle('is-link', !!target && !target.dataset.cursor);
      ring.current?.classList.toggle('is-label', !!target?.dataset.cursor);
      dot.current?.classList.toggle('is-hidden', !!target?.dataset.cursor);
      setLabel(target?.dataset.cursor || '');
    };
    const down = () => ring.current?.classList.add('is-down');
    const up = () => ring.current?.classList.remove('is-down');

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  if (!finePointer || reduced) return null;
  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true">
        <span>{label}</span>
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
