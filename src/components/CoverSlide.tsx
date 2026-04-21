import { useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import gsap from 'gsap/dist/gsap';

export function CoverSlide({ slide }: { slide: SlideData }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cover-title',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
      );
      gsap.fromTo('.cover-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.5 }
      );
      gsap.fromTo('.cover-info',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.8 }
      );
      gsap.fromTo('.cover-quote',
        { opacity: 0 },
        { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', delay: 1.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      {/* Subtle gradient background */}
      <div className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.12) 0%, transparent 60%)'
        }} />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

      <div className="relative z-10 text-center" style={{ padding: 'var(--slide-padding)' }}>
        <h1
          className="cover-title slide-title-hero font-bold mb-5"
          style={{
            opacity: 0
          }}>
          {slide.title}
        </h1>

        <p
          className="cover-subtitle font-light tracking-wide mb-14"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
            color: 'var(--accent-light)',
            opacity: 0
          }}>
          {slide.subtitle}
        </p>

        <div className="cover-info flex items-center justify-center gap-3" style={{ opacity: 0 }}>
          {slide.content?.map((c, i) => (
            <span key={i} className="text-sm tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {c.text}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom quote */}
      {slide.quote && (
        <div className="cover-quote absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: 0 }}>
          <p className="text-sm tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>
            {slide.quote}
          </p>
        </div>
      )}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.3 }} />
    </div>
  );
}
