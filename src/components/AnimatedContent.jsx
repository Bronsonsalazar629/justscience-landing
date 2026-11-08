import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedContent({
  as: Element = 'div',
  children,
  distance = 100,
  direction = 'vertical',
  duration = 0.8,
  ease = 'power3.out',
  blur = 0,
  stagger = 0.08,
  threshold = 0.1,
  className = '',
  style,
  ...props
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const targets =
      stagger > 0 && element.children.length
        ? Array.from(element.children)
        : [element];

    gsap.set(element, { visibility: 'visible' });

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const from = { [axis]: distance, opacity: 0 };
    const to = {
      [axis]: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      clearProps: 'transform,filter',
      scrollTrigger: {
        trigger: element,
        start: `top ${(1 - threshold) * 100}%`,
        once: true,
      },
    };

    if (blur > 0) {
      from.filter = `blur(${blur}px)`;
      to.filter = 'blur(0px)';
    }

    const context = gsap.context(() => {
      gsap.fromTo(targets, from, to);
    }, element);

    return () => context.revert();
  }, [blur, direction, distance, duration, ease, stagger, threshold]);

  return (
    <Element
      {...props}
      ref={ref}
      className={className}
      style={{ visibility: 'hidden', ...style }}
    >
      {children}
    </Element>
  );
}
