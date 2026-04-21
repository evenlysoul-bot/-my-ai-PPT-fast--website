import { useEffect, useRef } from 'react';
import type { SlideData } from '@/types';
import gsap from 'gsap/dist/gsap';
import { QrCode, ExternalLink } from 'lucide-react';
import { ImageUploadSlot } from './ImageUploadSlot';

interface VideoSlideProps {
  slide: SlideData;
  getImage: (slideId: number, slotId: string) => string | null;
  onUpload: (slotId: string, file: File) => void;
}

export function VideoSlide({ slide, getImage, onUpload }: VideoSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.video-inner',
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
        <div className="video-inner slide-frame" style={{ opacity: 0 }}>
          <h1 className="slide-title font-bold mb-2">
            {slide.title}
          </h1>
          {slide.subtitle && <p className="slide-subtitle font-light mb-6">{slide.subtitle}</p>}

          <div className="slide-body-scroll">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              {slide.content?.map((c, i) => {
                switch (c.type) {
                  case 'heading':
                    return <h3 key={i} className="font-semibold mt-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h3-size)', color: 'var(--accent-light)' }}>{c.text}</h3>;
                  case 'text':
                    return <p key={i} style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.text}</p>;
                  case 'link':
                    return <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="card-glass rounded-lg px-4 py-2 inline-flex items-center gap-2 hover:border-indigo-500/40" style={{ fontSize: 'var(--small-size)', color: 'var(--accent-light)' }}>{c.text} <ExternalLink className="w-3.5 h-3.5" /></a>;
                  default: return null;
                }
              })}

              {slide.links && slide.links.length > 0 && (
                <div className="flex flex-wrap gap-2.5 mt-4">
                  {slide.links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="card-glass rounded-lg px-4 py-2 flex items-center gap-2 hover:border-indigo-500/40" style={{ fontSize: 'var(--small-size)', color: 'var(--accent-light)' }}>
                      {link.text} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-5">
              {slide.videoQr && slide.videoQr.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--h3-size)', color: 'var(--text-primary)' }}>
                    <QrCode className="w-5 h-5" style={{ color: 'var(--accent)' }} /> 扫码到微信观看
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {slide.videoQr.map((qr, i) => (
                      <div key={i} className="card-glass rounded-xl p-4 text-center">
                        <div className="w-20 h-20 mx-auto bg-white rounded-lg flex items-center justify-center mb-2">
                          <QrCode className="w-10 h-10" style={{ color: 'var(--bg-primary)' }} />
                        </div>
                        <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)' }}>{qr.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
