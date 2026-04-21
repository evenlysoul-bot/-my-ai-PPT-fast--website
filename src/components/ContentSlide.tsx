import { useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import gsap from 'gsap/dist/gsap';
import { ExternalLink } from 'lucide-react';
import { ImageUploadSlot } from './ImageUploadSlot';
import { IndustryChart } from './IndustryChart';
import { MultiAgentFlow } from './MultiAgentFlow';
import { PromptCompare } from './PromptCompare';
import { LearningMap } from './LearningMap';
import { CaseSwitcherBoard } from './CaseSwitcherBoard';

interface ContentSlideProps {
  slide: SlideData;
  getImage: (slideId: number, slotId: string) => string | null;
  onUpload: (slotId: string, file: File) => void;
}

export function ContentSlide({ slide, getImage, onUpload }: ContentSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLongTitle = (slide.title?.length || 0) >= 18;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.content-inner',
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
        <div className="content-inner slide-frame" style={{ opacity: 0 }}>

          {/* Title */}
          <h1 className={`slide-title font-bold mb-2 ${isLongTitle ? 'slide-title-tight' : ''}`}>
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="slide-subtitle mb-6 font-light">
              {slide.subtitle}
            </p>
          )}

          <div className="slide-body-scroll">
            <div className={`grid gap-8 items-start ${slide.id === 11 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            {/* Left: content */}
            <div className="space-y-5">
              {slide.content?.map((c, i) => {
                switch (c.type) {
                  case 'heading':
                    return (
                      <h3 key={i} className="font-semibold mt-5 mb-1"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'var(--h3-size)',
                          color: 'var(--accent-light)'
                        }}>
                        {c.text}
                      </h3>
                    );
                  case 'text':
                    if (c.text === 'chart-industry-impact') return <IndustryChart key={i} />;
                    if (c.text === 'flowchart-multi-agent') return <MultiAgentFlow key={i} />;
                    if (c.text === 'prompt-compare') return <PromptCompare key={i} />;
                    if (c.text === 'learning-map') return <LearningMap key={i} />;
                    if (c.text === 'case-switcher-board') return <CaseSwitcherBoard key={i} />;
                    return (
                      <p key={i} style={{
                        fontSize: 'var(--body-size)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7
                      }}>
                        {c.text}
                      </p>
                    );
                  case 'list':
                    return (
                      <ul key={i} className="space-y-2.5">
                        {c.items?.map((item, j) => (
                          <li key={j} className="flex items-start gap-3"
                            style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)' }}>
                            <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                              style={{ background: 'var(--accent)' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  case 'code':
                    return (
                      <pre key={i} className="rounded-xl p-5 overflow-x-auto font-mono leading-relaxed"
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border)',
                          fontSize: 'var(--small-size)',
                          color: 'var(--text-primary)'
                        }}>
                        {c.text}
                      </pre>
                    );
                  case 'stat':
                    return (
                      <div key={i} className="rounded-2xl p-6 glow-border"
                        style={{ background: 'rgba(99,102,241,0.06)' }}>
                        <p className="text-3xl font-bold tracking-tight"
                          style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-light)' }}>
                          {c.value}
                        </p>
                      </div>
                    );
                  case 'card':
                    return (
                      <div key={i} className="grid grid-cols-1 gap-3">
                        {c.cards?.map((card, j) => (
                          <div key={j} className="card-glass rounded-xl p-4 cursor-default">
                            <h4 className="font-semibold mb-1"
                              style={{ color: 'var(--text-primary)', fontSize: 'var(--body-size)' }}>
                              {card.title}
                            </h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--small-size)' }}>
                              {card.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    );
                  default:
                    return null;
                }
              })}

              {slide.links && slide.links.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mt-6">
                  {slide.links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                      className="card-glass rounded-lg px-4 py-2.5 flex items-center gap-2 transition-all hover:border-indigo-500/40"
                      style={{ fontSize: 'var(--small-size)', color: 'var(--accent-light)' }}>
                      {link.text}
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Right: image slots */}
            {slide.id !== 11 && (
              <div className="space-y-4">
                {slide.imageSlots?.map(slot => (
                  <ImageUploadSlot key={slot.id} label={slot.label}
                    defaultText={slot.defaultText || `点击上传${slot.label}`}
                    imageUrl={getImage(slide.id, slot.id)}
                    defaultPath={slot.defaultPath}
                    linkUrl={slot.linkUrl}
                    onUpload={(file) => onUpload(slot.id, file)} />
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {slide.quote && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <p className="text-xs tracking-[0.2em] italic" style={{ color: 'var(--text-muted)' }}>
            「{slide.quote}」
          </p>
        </div>
      )}
    </div>
  );
}
