import { useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import gsap from 'gsap/dist/gsap';
import { ExternalLink, Sparkles } from 'lucide-react';
import { ImageUploadSlot } from './ImageUploadSlot';

interface DemoSlideProps {
  slide: SlideData;
  getImage: (slideId: number, slotId: string) => string | null;
  onUpload: (slotId: string, file: File) => void;
}

export function DemoSlide({ slide, getImage, onUpload }: DemoSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.demo-inner',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.15 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [slide.id]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      <div className="flex-1 flex items-center" style={{ padding: 'var(--slide-padding)' }}>
        <div className="demo-inner slide-frame" style={{ opacity: 0 }}>

          <h1 className="slide-title font-bold mb-2">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="slide-subtitle font-light mb-6">
              {slide.subtitle}
            </p>
          )}

          <div className="slide-body-scroll">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-5">
              {slide.content?.map((c, i) => {
                switch (c.type) {
                  case 'heading':
                    return <h3 key={i} className="font-semibold mt-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h3-size)', color: 'var(--accent-light)' }}>{c.text}</h3>;
                  case 'text':
                    return <p key={i} style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.text}</p>;
                  case 'list':
                    return (
                      <ul key={i} className="space-y-2">
                        {c.items?.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5" style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)' }}>
                            <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  case 'stat':
                    return (
                      <div key={i} className="rounded-2xl p-5 glow-border" style={{ background: 'rgba(99,102,241,0.05)' }}>
                        <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-light)' }}>{c.value}</p>
                      </div>
                    );
                  default: return null;
                }
              })}

              {slide.links && slide.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                  {slide.links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="card-glass rounded-xl px-5 py-3 flex items-center gap-2 transition-all hover:border-indigo-500/40"
                      style={{ color: 'var(--accent-light)' }}>
                      {link.text} <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-4">
              {slide.imageSlots?.map(slot => (
                <ImageUploadSlot key={slot.id} label={slot.label}
                  defaultText={slot.defaultText || `点击上传${slot.label}`}
                  imageUrl={getImage(slide.id, slot.id)}
                  defaultPath={slot.defaultPath}
                  linkUrl={slot.linkUrl}
                  onUpload={(file) => onUpload(slot.id, file)} />
              ))}
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
