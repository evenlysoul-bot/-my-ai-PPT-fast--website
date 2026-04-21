import { useEffect, useCallback, useState } from 'react';
import { slides } from '@/data/slides';
import { useSlideStore } from '@/hooks/useSlideStore';
import { SlideRenderer } from '@/components/SlideRenderer';
import { ImageUploadPanel } from '@/components/ImageUploadPanel';
import { SlideNavigator } from '@/components/SlideNavigator';
import gsap from 'gsap/dist/gsap';

function App() {
  const store = useSlideStore();
  const [showNavigator, setShowNavigator] = useState(false);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const currentSlideData = slides[store.currentSlide] || slides[0];

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown':
        e.preventDefault(); store.nextSlide(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); store.prevSlide(); break;
      case 'Home': e.preventDefault(); store.goToSlide(0); break;
      case 'End': e.preventDefault(); store.goToSlide(slides.length - 1); break;
      case 'f': case 'F': toggleFullscreen(); break;
      case 'n': case 'N': setShowNavigator(prev => !prev); break;
      case 'u': case 'U': store.setShowUploadPanel(prev => !prev); break;
    }
  }, [store, toggleFullscreen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    gsap.fromTo('.slide-container',
      { opacity: 0.85, x: 15 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [store.currentSlide]);

  return (
    <div className="w-screen h-screen overflow-hidden relative select-none flex"
      style={{ background: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 pointer-events-none z-0 opacity-90">
        <div
          className="absolute left-1/2 top-[16%] h-[38vw] w-[38vw] min-h-[420px] min-w-[420px] -translate-x-1/2 rounded-full blur-[110px]"
          style={{ background: 'linear-gradient(180deg, rgba(255,153,0,0.26) 0%, rgba(255,0,255,0.28) 55%, rgba(0,255,255,0.12) 100%)' }}
        />
        <div
          className="absolute left-0 right-0 bottom-[-18%] h-[44%] opacity-55"
          style={{
            backgroundImage: 'linear-gradient(transparent 95%, rgba(255,0,255,0.6) 95%), linear-gradient(90deg, transparent 95%, rgba(0,255,255,0.45) 95%)',
            backgroundSize: '42px 42px',
            transform: 'perspective(900px) rotateX(76deg) scale(1.9)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, black 15%, transparent 100%)'
          }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none z-[5] opacity-20"
        style={{
          background: 'linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))'
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-[6] opacity-20"
        style={{
          background: 'linear-gradient(rgba(18,16,20,0) 50%, rgba(0,0,0,0.28) 50%)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* Main Slide */}
      <div className="slide-container flex-1 h-full relative z-10" style={{ marginRight: 0 }}>
        <SlideRenderer
          slide={currentSlideData}
          getImage={store.getImage}
          onUpload={(slotId, file) => store.uploadImage(slotId, currentSlideData.id, file)}
          votes={store.votes}
          onVote={store.vote}
          onResetVotes={store.resetVotes}
        />
      </div>

      {/* Right Sidebar */}
      <div className="h-full flex flex-col items-center z-50 relative"
        style={{
          width: '52px',
          background: 'rgba(8, 2, 20, 0.7)',
          backdropFilter: 'blur(18px)',
          borderLeft: '1px solid rgba(255,0,255,0.22)',
          boxShadow: 'inset 1px 0 0 rgba(0,255,255,0.16), 0 0 28px rgba(255,0,255,0.12)'
        }}>

        {/* Top: Page number */}
        <div className="pt-5 pb-2">
          <span className="text-xs font-mono terminal-label" style={{ color: 'var(--accent-light)' }}>
  {String(store.currentSlide).padStart(2, '0')}
          </span>
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>/</span>
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{String(slides.length - 1).padStart(2, '0')}</span>
        </div>

        {/* Prev button */}
        <button
          onClick={store.prevSlide}
          disabled={store.currentSlide === 0}
          className="w-8 h-8 flex items-center justify-center transition-all mb-1"
          style={{ color: store.currentSlide === 0 ? 'var(--text-muted)' : 'var(--accent-light)', opacity: store.currentSlide === 0 ? 0.3 : 1, borderRadius: 0 }}
          onMouseEnter={e => { if (store.currentSlide > 0) { e.currentTarget.style.background = 'rgba(0,255,255,0.12)'; e.currentTarget.style.color = '#090014'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,255,255,0.35)'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = store.currentSlide === 0 ? 'var(--text-muted)' : 'var(--text-secondary)'; }}
          title="上一页 (↑)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
        </button>

        {/* Middle: Dot Navigation */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 overflow-hidden w-full relative">
          {slides.map((slide, index) => {
            const isActive = index === store.currentSlide;
            const diff = Math.abs(index - store.currentSlide);
            if (diff > 10 && !isActive) return null;

            // Size based on distance
            const size = isActive ? 8 : diff <= 2 ? 5 : diff <= 5 ? 4 : 3;
            const opacity = isActive ? 1 : diff <= 2 ? 0.5 : diff <= 5 ? 0.25 : 0.12;

            return (
              <div key={index} className="relative flex items-center justify-center w-full"
                style={{ height: isActive ? 22 : 16 }}>
                {/* Hover tooltip */}
                {hoveredDot === index && (
                  <div className="absolute right-10 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs z-[200] pointer-events-none"
                    style={{
                      background: 'rgba(8,2,20,0.92)',
                      border: '1px solid rgba(0,255,255,0.55)',
                      color: 'var(--accent-light)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    {slide.title || `幻灯片 ${index}`}
                  </div>
                )}
                <button
                  onClick={() => store.goToSlide(index)}
                  onMouseEnter={() => setHoveredDot(index)}
                  onMouseLeave={() => setHoveredDot(null)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: size,
                    height: size,
                    background: isActive ? 'var(--accent)' : 'rgba(0,255,255,0.28)',
                    opacity,
                    boxShadow: isActive ? '0 0 16px rgba(255,0,255,0.75), 0 0 30px rgba(0,255,255,0.35)' : 'none',
                    transform: isActive ? 'scale(1)' : 'scale(1)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={store.nextSlide}
          disabled={store.currentSlide === slides.length - 1}
          className="w-8 h-8 flex items-center justify-center transition-all mt-1"
          style={{ color: store.currentSlide === slides.length - 1 ? 'var(--text-muted)' : 'var(--accent-light)', opacity: store.currentSlide === slides.length - 1 ? 0.3 : 1, borderRadius: 0 }}
          onMouseEnter={e => { if (store.currentSlide < slides.length - 1) { e.currentTarget.style.background = 'rgba(0,255,255,0.12)'; e.currentTarget.style.color = '#090014'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,255,255,0.35)'; } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = store.currentSlide === slides.length - 1 ? 'var(--text-muted)' : 'var(--text-secondary)'; }}
          title="下一页 (↓)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>

        {/* Divider */}
        <div className="w-4 h-px my-2" style={{ background: 'var(--border)' }} />

        {/* Bottom: Tools & total */}
        <div className="flex flex-col items-center gap-1 pb-5">
          {/* Nav button */}
          <button onClick={() => setShowNavigator(true)}
            className="w-7 h-7 flex items-center justify-center transition-all mb-1"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,0,255,0.16)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(255,0,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            title="导航 (N)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          </button>

          {/* Upload button */}
          <button onClick={() => store.setShowUploadPanel(true)}
            className="w-7 h-7 flex items-center justify-center transition-all mb-1"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,0,255,0.16)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(255,0,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            title="图片 (U)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </button>

          {/* Fullscreen button */}
          <button onClick={toggleFullscreen}
            className="w-7 h-7 flex items-center justify-center transition-all mb-1"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,0,255,0.16)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(255,0,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            title="全屏 (F)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          </button>

          {/* Divider */}
          <div className="w-4 h-px my-1" style={{ background: 'var(--border)' }} />

          {/* Total count */}
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            {String(slides.length - 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Slide Navigator Overlay */}
      {showNavigator && (
        <SlideNavigator slides={slides} currentSlide={store.currentSlide}
          onSelect={store.goToSlide} onClose={() => setShowNavigator(false)} images={store.images} />
      )}

      {/* Image Upload Panel */}
      {store.showUploadPanel && (
        <ImageUploadPanel slides={slides} currentSlide={store.currentSlide} images={store.images}
          onUpload={store.uploadImage} onClose={() => store.setShowUploadPanel(false)} />
      )}
    </div>
  );
}

export default App;
