import { useState } from 'react';
import type { SlideData } from '@/types';
import type { UploadedImage } from '@/hooks/useSlideStore';
import { X, Upload, ImageIcon, Check } from 'lucide-react';

interface ImageUploadPanelProps {
  slides: SlideData[];
  currentSlide: number;
  images: Record<string, UploadedImage>;
  onUpload: (slotId: string, slideId: number, file: File) => void;
  onClose: () => void;
}

export function ImageUploadPanel({ slides, currentSlide, images, onUpload, onClose }: ImageUploadPanelProps) {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(currentSlide);

  const slidesWithSlots = slides
    .map((slide, index) => ({ slide, index }))
    .filter(({ slide }) => slide.imageSlots && slide.imageSlots.length > 0);
  const currentSlideData = slides[selectedSlideIndex];

  const handleFileChange = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(slotId, currentSlideData.id, file);
    }
    e.target.value = '';
  };

  const getImageForSlot = (slideId: number, slotId: string) => {
    return images[`${slideId}-${slotId}`]?.dataUrl || null;
  };

  return (
    <div className="absolute inset-0 z-[100] backdrop-blur-xl flex" style={{ background: 'rgba(8,2,20,0.92)' }}>
      {/* Sidebar - Slide List */}
      <div className="w-80 flex flex-col" style={{ borderRight: '1px solid rgba(255,0,255,0.22)', boxShadow: 'inset -1px 0 0 rgba(0,255,255,0.16)' }}>
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,255,255,0.28)' }}>
          <h2 className="text-white font-semibold flex items-center gap-2 terminal-prefix" style={{ color: 'var(--accent-light)', fontFamily: 'var(--font-display)' }}>
            <Upload className="w-5 h-5" />
            图片管理
          </h2>
          <button onClick={onClose} className="p-1.5 transition-colors" style={{ color: 'var(--text-muted)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {slidesWithSlots.map(({ slide, index }) => (
            <button
              key={slide.id}
              onClick={() => setSelectedSlideIndex(index)}
              className={`w-full text-left p-3 transition-all ${
                selectedSlideIndex === index
                  ? 'border'
                  : 'border border-transparent'
              }`}
              style={{
                background: selectedSlideIndex === index ? 'rgba(0,255,255,0.08)' : 'rgba(26,16,60,0.45)',
                borderColor: selectedSlideIndex === index ? 'rgba(0,255,255,0.5)' : 'transparent',
                boxShadow: selectedSlideIndex === index ? '0 0 18px rgba(0,255,255,0.16)' : 'none'
              }}
            >
              <p className="text-white/90 text-sm font-medium truncate">{slide.title}</p>
              <p className="text-white/40 text-xs mt-0.5">
                {slide.imageSlots?.length} 个图片位
                {slide.imageSlots?.filter(s => getImageForSlot(slide.id, s.id)).length
                  ? ` (${slide.imageSlots?.filter(s => getImageForSlot(slide.id, s.id)).length} 已上传)`
                  : ''}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main - Upload Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-6" style={{ borderBottom: '1px solid rgba(0,255,255,0.28)' }}>
          <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{currentSlideData?.title}</h3>
          <p className="mt-1" style={{ color: 'var(--text-muted)' }}>{currentSlideData?.subtitle}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {currentSlideData?.imageSlots?.map(slot => {
            const existingImage = getImageForSlot(currentSlideData.id, slot.id);
            return (
              <div key={slot.id} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium flex items-center gap-2" style={{ color: 'var(--accent-light)', fontFamily: 'var(--font-display)' }}>
                    <ImageIcon className="w-4 h-4" />
                    {slot.label}
                  </h4>
                  {existingImage && (
                    <span className="text-xs flex items-center gap-1 terminal-label" style={{ color: 'var(--accent-warm)' }}>
                      <Check className="w-3.5 h-3.5" />
                      已上传
                    </span>
                  )}
                </div>

                {existingImage ? (
                  <div className="relative group overflow-hidden card-glass">
                    <img src={existingImage} alt={slot.label} className="w-full max-h-[400px] object-contain bg-black/20" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="px-4 py-2 cursor-pointer flex items-center gap-2 transition-all" style={{ background: 'rgba(255,0,255,0.16)', color: 'var(--text-primary)', border: '1px solid rgba(255,0,255,0.55)' }}>
                        <Upload className="w-4 h-4" />
                        替换图片
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(slot.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed p-12 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300" style={{ borderColor: 'rgba(255,0,255,0.3)', background: 'rgba(26,16,60,0.4)' }}>
                    <Upload className="w-10 h-10" style={{ color: 'var(--accent-light)' }} />
                    <p className="text-sm terminal-prefix" style={{ color: 'var(--text-muted)' }}>{slot.defaultText || `点击上传${slot.label}`}</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(slot.id, e)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
