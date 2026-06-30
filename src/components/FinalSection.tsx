import { useEffect, useRef } from 'react';

export default function FinalSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="final-section" id="final">
      {/* Glows */}
      <div
        className="hero-bg-glow"
        style={{
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(244,167,185,0.2) 0%, transparent 70%)',
          top: '0%', left: '0%',
        }}
      />
      <div
        className="hero-bg-glow"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)',
          bottom: '0%', right: '0%',
          animationDelay: '2s',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto fade-in">
        <p
          className="text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: 'rgba(212,168,67,0.8)', fontFamily: "'Lato', sans-serif" }}
        >
          With All My Heart
        </p>

        <h1 className="final-title mb-8">
          Happy Birthday Tracy <span className="pulsing-heart">❤️</span>
        </h1>

        <div className="flex justify-center items-center gap-4 mb-10">
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4a843)' }} />
          <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="3" fill="#d4a843" />
          </svg>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #d4a843, transparent)' }} />
        </div>

        <div
          className="space-y-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <p
            className="text-xl md:text-2xl italic"
            style={{ color: 'rgba(252, 228, 236, 0.9)', lineHeight: 1.7 }}
          >
            You've given so much love to others.<br />
            Today we celebrate <span style={{ color: '#d4a843' }}>YOU</span>.
          </p>

          <div
            className="pt-6 space-y-4 text-lg md:text-xl"
            style={{ color: 'rgba(252, 228, 236, 0.8)', lineHeight: 1.9 }}
          >
            <p>May God bless every step you take.</p>
            <p>May your smile never fade.</p>
            <p>May your heart always know peace.</p>
            <p>May your kindness return to you a thousandfold.</p>
          </div>

          <p
            className="text-2xl md:text-3xl pt-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic',
              color: '#d4a843',
              fontWeight: 500,
            }}
          >
            Happy Birthday, my wonderful sister.
          </p>
        </div>

        {/* Glowing heart */}
        <div className="mt-12 flex justify-center">
          <div className="pulsing-heart">
            <svg width="80" height="72" viewBox="0 0 100 90" fill="none">
              <path
                d="M50 85 C50 85 5 55 5 28 C5 14 16 5 28 5 C37 5 45 10 50 18 C55 10 63 5 72 5 C84 5 95 14 95 28 C95 55 50 85 50 85Z"
                fill="url(#heartGrad)"
              />
              <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f4a7b9" />
                  <stop offset="50%" stopColor="#e91e63" />
                  <stop offset="100%" stopColor="#d4a843" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
