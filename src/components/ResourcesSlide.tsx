import { useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import gsap from 'gsap/dist/gsap';
import { ExternalLink, BookOpen, Video, Wrench, Users, Github, Globe } from 'lucide-react';

interface ResourcesSlideProps {
  slide: SlideData;
}

export function ResourcesSlide({ slide }: ResourcesSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.resources-inner',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.15 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [slide.id]);

  const getIcon = (text: string) => {
    if (text.includes('教程') || text.includes('Course')) return <BookOpen className="w-4 h-4" />;
    if (text.includes('视频') || text.includes('Video')) return <Video className="w-4 h-4" />;
    if (text.includes('工具') || text.includes('Prompt')) return <Wrench className="w-4 h-4" />;
    if (text.includes('博主') || text.includes('社区')) return <Users className="w-4 h-4" />;
    if (text.includes('GitHub')) return <Github className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      <div className="flex-1 flex items-center" style={{ padding: 'var(--slide-padding)' }}>
        <div className="resources-inner slide-frame" style={{ opacity: 0 }}>
          <h1 className="slide-title font-bold mb-2">
            {slide.title}
          </h1>
          {slide.subtitle && <p className="slide-subtitle font-light mb-6">{slide.subtitle}</p>}

          <div className="slide-body-scroll">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              {slide.content?.map((c, i) => {
                switch (c.type) {
                  case 'heading':
                    return <h3 key={i} className="font-semibold mt-5" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h3-size)', color: 'var(--accent-light)' }}>{c.text}</h3>;
                  case 'text':
                    return <p key={i} style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.text}</p>;
                  case 'list':
                    return <ul key={i} className="space-y-2">{c.items?.map((item, j) => <li key={j} className="flex items-start gap-2.5" style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)' }}><span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: 'var(--accent)' }} />{item}</li>)}</ul>;
                  default: return null;
                }
              })}
            </div>

            <div className="space-y-3">
              {slide.links && slide.links.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h3-size)', color: 'var(--text-primary)' }}>推荐链接</h3>
                  <div className="space-y-2.5">
                    {slide.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                        className="card-glass rounded-xl p-4 flex items-center gap-4 group transition-all hover:border-indigo-500/30">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--accent)' }}>
                          {getIcon(link.text)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate" style={{ color: 'var(--text-primary)', fontSize: 'var(--body-size)' }}>{link.text}</p>
                          <p className="truncate" style={{ color: 'var(--text-muted)', fontSize: 'var(--small-size)' }}>{link.url}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 shrink-0 opacity-30 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--accent)' }} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
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
