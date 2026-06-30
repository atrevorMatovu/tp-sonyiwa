import { useEffect, useRef } from 'react';

export default function Letter() {
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
    <section ref={ref} className="letter-section" id="letter">
      {/* Decorative glows */}
      <div
        className="hero-bg-glow"
        style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(244,167,185,0.15) 0%, transparent 70%)',
          top: '10%', left: '5%',
        }}
      />
      <div
        className="hero-bg-glow"
        style={{
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)',
          bottom: '10%', right: '5%',
          animationDelay: '2s',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto fade-in">
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: 'rgba(212,168,67,0.9)', fontFamily: "'Lato', sans-serif" }}
          >
            A Letter From the Heart
          </p>
          <h2 className="section-title-light">For You, Tracy</h2>
          <div className="flex justify-center mt-6">
            <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, #d4a843, transparent)' }} />
          </div>
        </div>

        <div className="letter-card">
          {/* Letter header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">💌</div>
            <p
              className="text-sm tracking-widest uppercase"
              style={{ color: '#b8860b', fontFamily: "'Lato', sans-serif" }}
            >
              Dearest Tracy,
            </p>
          </div>

          <div className="letter-text space-y-5">
            <p>
              I don't think I've ever said this properly, so I want to say it now — you have always been one of the kindest people in my life. Not just kind in words, but in the way you show up, again and again, without ever making it about yourself.
            </p>

            <p>
              You have never forgotten my birthday. Not once. Every single year, without fail, you've made me feel remembered, celebrated, and loved. And it's never just a message — it's always something thoughtful, something that shows you truly know me.
            </p>

            <p>
              Every birthday, every New Year, you surprise me with gifts that leave me wondering how you always know exactly what would make me happy. Your generosity has never gone unnoticed. I see it, I feel it, and I carry it with me.
            </p>

            <p>
              You have always cared for me without expecting anything in return. That kind of love is rare. That kind of love is something I don't take for granted.
            </p>

            <p>
              Watching you grow — from the lovely young girl I grew up beside, into the remarkable woman you are today — has been one of the quiet inspirations of my life. You make it look effortless, but I know the strength it has taken.
            </p>

            <p>
              You deserve every happiness life has to offer. I pray that God blesses you abundantly — beyond what you could ask for, beyond what you could imagine. May every dream you carry in your heart become reality. May you continue to be surrounded by love, by peace, by success, by good health, and by endless joy.
            </p>

            <p style={{ fontStyle: 'italic', textAlign: 'center', fontSize: '1.3rem', color: '#8b3a62' }}>
              Happy Birthday, my wonderful sister.
            </p>
          </div>

          {/* Signature */}
          <div className="text-right mt-8">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '1.4rem',
                color: '#8b3a62',
              }}
            >
              — With all my love,
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: '1.6rem',
                fontWeight: 500,
                color: '#5a3d6b',
              }}
            >
              Your younger brother
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
