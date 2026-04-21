import { useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import gsap from 'gsap/dist/gsap';

interface CodeSlideProps {
  slide: SlideData;
}

export function CodeSlide({ slide }: CodeSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.code-inner',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.15 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [slide.id]);

  const codeContent = slide.content?.find(c => c.type === 'code')?.text || '';

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      <div className="flex-1 flex items-center" style={{ padding: 'var(--slide-padding)' }}>
        <div className="code-inner slide-frame" style={{ opacity: 0 }}>

          <h1 className="slide-title font-bold mb-2">
            {slide.title}
          </h1>
          {slide.subtitle && <p className="slide-subtitle font-light mb-6">{slide.subtitle}</p>}

          <div className="slide-body-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-4">
              {slide.content?.map((c, i) => {
                if (c.type === 'code') return null;
                switch (c.type) {
                  case 'heading':
                    return <h3 key={i} className="font-semibold mt-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h3-size)', color: 'var(--accent-light)' }}>{c.text}</h3>;
                  case 'text':
                    return <p key={i} style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.text}</p>;
                  case 'stat':
                    return <div key={i} className="rounded-xl p-4 glow-border" style={{ background: 'rgba(99,102,241,0.06)' }}><p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-light)' }}>{c.value}</p></div>;
                  default: return null;
                }
              })}
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden glow-border"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-2 px-5 py-3.5" style={{ borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
                  <span className="ml-3 text-xs" style={{ color: 'var(--text-muted)' }}>prompt.txt</span>
                </div>
                <pre className="p-6 overflow-x-auto whitespace-pre-wrap leading-relaxed"
                  style={{ fontSize: 'var(--small-size)', color: 'var(--text-primary)' }}>
                  {codeContent}
                </pre>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {slide.quote && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <p className="text-xs tracking-[0.2em] italic" style={{ color: 'var(--text-muted)' }}>「{slide.quote}」</p>
        </div>
      )}
    </div>
  );
}
