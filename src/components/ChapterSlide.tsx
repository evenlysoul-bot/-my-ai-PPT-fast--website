import { useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import gsap from 'gsap/dist/gsap';

export function ChapterSlide({ slide }: { slide: SlideData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo('.ch-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }
      )
      .fromTo('.ch-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' },
        '-=0.45'
      )
      .fromTo('.ch-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'expo.out' },
        '-=0.3'
      )
      .fromTo('.ch-quote',
        { opacity: 0 },
        { opacity: 0.25, duration: 1, ease: 'power2.inOut' },
        '-=0.2'
      );
    }, containerRef);
    return () => ctx.revert();
  }, [slide.id]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      {/* Radial glow */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)'
        }} />

      <div className="relative z-10 text-center max-w-4xl" style={{ padding: 'var(--slide-padding)' }}>
        <h1
          className="ch-title slide-title-chapter font-bold mb-5"
          style={{
            opacity: 0
          }}>
          {slide.title}
        </h1>

        <p
          className="ch-subtitle font-light"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.3rem)',
            color: 'var(--text-secondary)',
            opacity: 0
          }}>
          {slide.subtitle}
        </p>

        {/* Accent line */}
        <div className="ch-line w-16 h-px mx-auto mt-8 origin-left"
          style={{ background: 'var(--accent)', opacity: 0.6 }} />
      </div>

      {slide.quote && (
        <div className="ch-quote absolute bottom-10 left-1/2 -translate-x-1/2">
          <p className="text-sm tracking-[0.25em] italic" style={{ color: 'var(--text-muted)' }}>
            「{slide.quote}」
          </p>
        </div>
      )}
    </div>
  );
}
