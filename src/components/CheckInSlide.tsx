import { useEffect, useRef } from 'react';
import { ScanLine } from 'lucide-react';

interface CheckInSlideProps {
  title: string;
  subtitle: string;
  quote: string;
}

export function CheckInSlide({ title, subtitle, quote }: CheckInSlideProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.25 + 0.05,
      });
    }

    let animId: number;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx!.fill();
      });
      animId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Radial glow */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(99,102,241,0.1) 0%, transparent 60%)'
        }} />

      <div className="relative z-10 flex flex-col items-center" style={{ gap: 'var(--content-gap)', padding: 'var(--slide-padding)' }}>

        {/* Title */}
        <div className="text-center">
          <h1 className="font-bold tracking-tight mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.1
            }}>
            {title}
          </h1>
          <p className="font-light tracking-wide"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              color: 'var(--accent-light)'
            }}>
            {subtitle}
          </p>
        </div>

        {/* QR Code */}
        <div className="card-glass rounded-3xl p-8 md:p-10 flex flex-col items-center gap-5 glow-border"
          style={{ backdropFilter: 'blur(30px)' }}>
          <div className="w-52 h-52 md:w-60 md:h-60 bg-white rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
            <img src="/qr/checkin.jpg" alt="签到二维码" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2.5" style={{ color: 'var(--text-secondary)' }}>
            <ScanLine className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: 'var(--body-size)' }}>{quote}</span>
          </div>
        </div>

        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>活动即将开始...</p>
      </div>
    </div>
  );
}
