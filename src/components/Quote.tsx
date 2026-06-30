import { useEffect, useRef } from 'react';

export default function Quote() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="quote-section" id="quote">
      {/* Glows */}
      <div
        className="hero-bg-glow"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(244,167,185,0.12) 0%, transparent 70%)',
          top: '0%', left: '10%',
        }}
      />
      <div
        className="hero-bg-glow"
        style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(212,168,67,0.1) 0%, transparent 70%)',
          bottom: '0%', right: '10%',
          animationDelay: '2s',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center fade-in">
        {/* Quote mark */}
        <div className="mb-6">
          <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
            <path
              d="M0 40V25C0 11 9 2 22 0L24 6C16 8 12 13 12 20H22V40H0ZM28 40V25C28 11 37 2 50 0L52 6C44 8 40 13 40 20H50V40H28Z"
              fill="url(#quoteGrad)"
              opacity="0.8"
            />
            <defs>
              <linearGradient id="quoteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4a843" />
                <stop offset="100%" stopColor="#f4a7b9" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p className="quote-text">
          Some people make the world brighter simply by being in it. Tracy, you've always been one of those people.
        </p>

        {/* Decorative line */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4a843)' }} />
          <svg width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="2" fill="#d4a843" />
          </svg>
          <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, #d4a843, transparent)' }} />
        </div>
      </div>
    </section>
  );
}
