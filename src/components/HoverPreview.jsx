import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { gsap, finePointer, reduced } from '../lib/motion';

/**
 * Floating image that follows the pointer while hovering a list.
 * Parent calls ref.show(src) / ref.hide().
 */
const HoverPreview = forwardRef(function HoverPreview({ ratio = '4 / 3' }, ref) {
  const box = useRef(null);
  const img = useRef(null);
  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled) return;
    gsap.set(box.current, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
    const xTo = gsap.quickTo(box.current, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(box.current, 'y', { duration: 0.6, ease: 'power3' });
    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [enabled]);

  useImperativeHandle(ref, () => ({
    show(src) {
      if (!enabled) return;
      if (img.current.getAttribute('src') !== src) img.current.setAttribute('src', src);
      gsap.to(box.current, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'expo.out', overwrite: 'auto' });
    },
    hide() {
      if (!enabled) return;
      gsap.to(box.current, { scale: 0.6, autoAlpha: 0, duration: 0.4, ease: 'expo.out', overwrite: 'auto' });
    },
  }));

  if (!enabled) return null;
  return (
    <div className="hover-preview" ref={box} style={{ aspectRatio: ratio }} aria-hidden="true">
      <img ref={img} alt="" />
    </div>
  );
});

export default HoverPreview;
