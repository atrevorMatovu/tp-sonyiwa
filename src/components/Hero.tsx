import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string; pulse: number;
    }> = [];

    const colors = ['#f4a7b9', '#d4a843', '#e8d5f0', '#fce4ec', '#ffffff'];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.1,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.7 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.pulse += 0.02;
        p.x += p.vx;
        p.y += p.vy;
        const pOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle =
          p.color +
          Math.floor(pOpacity * 255)
            .toString(16)
            .padStart(2, '0');
        ctx.fill();

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="hero-section">
      {/* Glow orbs */}
      <div
        className="hero-bg-glow"
        style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(244,167,185,0.25) 0%, transparent 70%)',
          top: '-10%', left: '-10%',
        }}
      />
      <div
        className="hero-bg-glow"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(212,168,67,0.2) 0%, transparent 70%)',
          bottom: '-5%', right: '-5%',
          animationDelay: '3s',
        }}
      />
      <div
        className="hero-bg-glow"
        style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(156,111,190,0.15) 0%, transparent 70%)',
          top: '30%', right: '10%',
          animationDelay: '1.5s',
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Crown decoration */}
        <div className="flex justify-center mb-4 opacity-80">
          <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
            <path d="M5 35 L10 10 L22 28 L30 5 L38 28 L50 10 L55 35 Z" fill="url(#crownGrad)" />
            <defs>
              <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4a843" />
                <stop offset="100%" stopColor="#f4a7b9" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="hero-title mb-2">Happy Birthday,</h1>
        <h2 className="hero-name mb-8">Tracy</h2>

        {/* Gold line */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4a843)' }} />
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="3" fill="#d4a843" />
            <circle cx="10" cy="10" r="6" fill="none" stroke="#d4a843" strokeWidth="0.5" opacity="0.5" />
          </svg>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #d4a843, transparent)' }} />
        </div>

        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: 'rgba(252, 228, 236, 0.85)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          }}
        >
          Today we celebrate not only another year of your life, but the incredible woman you've become — a soul that makes this world undeniably brighter.
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        onClick={() => document.getElementById('carousel')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(212,168,67,0.7)',
          }}
        >
          Scroll to Begin
        </p>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(212,168,67,0.7)" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
