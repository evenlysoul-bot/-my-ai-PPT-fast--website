import type { SlideData } from '@/types';
import type { UploadedImage } from '@/hooks/useSlideStore';
import { X } from 'lucide-react';

interface SlideNavigatorProps {
  slides: SlideData[];
  currentSlide: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  images: Record<string, UploadedImage>;
}

const LAYOUT_LABELS: Record<string, string> = {
  checkin: '签到', cover: '封面', chapter: '章节', content: '内容',
  video: '视频', demo: '演示', vote: '投票', code: '代码',
  summary: '总结', resources: '资源', end: '结束',
};

export function SlideNavigator({ slides, currentSlide, onSelect, onClose, images }: SlideNavigatorProps) {
  const getThumbnail = (slide: SlideData) => {
    if (!slide.imageSlots || slide.imageSlots.length === 0) return null;
    const firstSlot = slide.imageSlots[0];
    return images[`${slide.id}-${firstSlot.id}`]?.dataUrl || firstSlot.defaultPath || null;
  };

  return (
    <div className="absolute inset-0 z-[100] flex flex-col"
      style={{ background: 'rgba(8, 2, 20, 0.94)', backdropFilter: 'blur(30px)' }}>

      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(0,255,255,0.28)', boxShadow: 'inset 0 -1px 0 rgba(255,0,255,0.2)' }}>
        <h2 className="font-semibold terminal-prefix" style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-light)' }}>幻灯片导航</h2>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,0,255,0.16)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(255,0,255,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {slides.map((slide, index) => {
            const thumbnail = getThumbnail(slide);
            const isActive = index === currentSlide;

            return (
              <button key={slide.id} onClick={() => { onSelect(index); onClose(); }}
                className="overflow-hidden transition-all hover:scale-105 text-left card-glass"
                style={{
                  border: isActive ? '1.5px solid var(--accent-light)' : '1.5px solid rgba(255,0,255,0.2)',
                  boxShadow: isActive ? '0 0 18px rgba(0,255,255,0.28), 0 0 30px rgba(255,0,255,0.18)' : 'none'
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(0,255,255,0.6)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.borderColor = 'rgba(255,0,255,0.2)'; }}>

                <div className="aspect-video relative" style={{ background: 'var(--bg-secondary)' }}>
                  {thumbnail ? (
                    <img src={thumbnail} alt="" className="w-full h-full object-cover" style={{ opacity: 0.5 }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.06)' }}>{index}</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="text-xs px-2 py-0.5 terminal-label" style={{ background: isActive ? 'rgba(0,255,255,0.18)' : 'rgba(0,0,0,0.6)', color: isActive ? 'var(--accent-light)' : 'var(--text-secondary)' }}>
                      {LAYOUT_LABELS[slide.layout] || slide.layout}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <span className="text-xs px-2 py-0.5 terminal-label" style={{ background: 'rgba(255,0,255,0.2)', color: 'var(--text-primary)' }}>当前</span>
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{slide.title || `幻灯片 ${index}`}</p>
                  {slide.subtitle && <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{slide.subtitle}</p>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
