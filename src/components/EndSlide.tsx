import { useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import gsap from 'gsap/dist/gsap';

export function EndSlide({ slide }: { slide: SlideData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.end-title',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out', delay: 0.3 }
      );
      gsap.fromTo('.end-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.7 }
      );
      gsap.fromTo('.end-info',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out', delay: 1 }
      );

      // Breathing animation
      gsap.to('.end-title', {
        opacity: 0.75,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      {/* Gradient background */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(99,102,241,0.12) 0%, transparent 60%)'
        }} />

      <div className="relative z-10 text-center" style={{ padding: 'var(--slide-padding)' }}>
        <h1 ref={quoteRef}
          className="end-title slide-title-hero font-bold mb-8"
          style={{
            opacity: 0
          }}>
          {slide.title}
        </h1>

        <p className="end-subtitle font-light tracking-wide mb-16"
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
            color: 'var(--accent-light)',
            opacity: 0
          }}>
          {slide.subtitle}
        </p>

        <div className="end-info space-y-3" style={{ opacity: 0 }}>
          {slide.content?.map((c, i) => (
            <div key={i}>
              {c.type === 'heading' && <p className="font-semibold" style={{ color: 'var(--text-secondary)', fontSize: 'var(--h3-size)' }}>{c.text}</p>}
              {c.type === 'text' && <p style={{ color: 'var(--text-muted)', fontSize: 'var(--body-size)' }}>{c.text}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: 0.25 }} />

      {slide.quote && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <p className="text-sm tracking-[0.25em] italic" style={{ color: 'var(--text-muted)' }}>「{slide.quote}」</p>
        </div>
      )}
    </div>
  );
}
