import { useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import gsap from 'gsap/dist/gsap';
import { CheckCircle2 } from 'lucide-react';

interface SummarySlideProps {
  slide: SlideData;
}

export function SummarySlide({ slide }: SummarySlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.summary-inner',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.15 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [slide.id]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)' }} />

      <div className="summary-inner slide-frame relative z-10 text-center" style={{ padding: 'var(--slide-padding)', opacity: 0 }}>
        <h1 className="slide-title font-bold mb-4">
          {slide.title}
        </h1>
        {slide.subtitle && <p className="slide-subtitle font-light mb-8">{slide.subtitle}</p>}

        <div className="slide-body-scroll">
        {slide.steps && slide.steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {slide.steps.map((s, i) => (
              <div key={i} className="card-glass rounded-2xl p-8 text-center">
                <span className="text-5xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'rgba(99,102,241,0.2)' }}>{s.step}</span>
                <p className="mt-4" style={{ color: 'var(--text-secondary)', fontSize: 'var(--body-size)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        )}

        {slide.content?.map((c, i) => {
          if (c.type === 'list') {
            return (
              <div key={i} className="space-y-3 max-w-2xl mx-auto">
                {c.items?.map((item, j) => (
                  <div key={j} className="card-glass rounded-xl p-5 flex items-center gap-4 text-left">
                    <CheckCircle2 className="w-6 h-6 shrink-0" style={{ color: 'var(--accent)' }} />
                    <span style={{ color: 'var(--text-primary)', fontSize: 'var(--body-size)' }}>{item}</span>
                  </div>
                ))}
              </div>
            );
          }
          return null;
        })}
        </div>
      </div>

      {slide.quote && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <p className="text-sm tracking-[0.25em] italic" style={{ color: 'var(--text-muted)' }}>「{slide.quote}」</p>
        </div>
      )}
    </div>
  );
}
