import { useEffect, useRef } from 'react';

const milestones = [
  {
    title: 'Little Girl',
    text: 'Going to school and back home with you was somewhat comforting. I could always count on you.',
    icon: '🌸',
  },
  {
    title: 'Growing Up',
    text: 'Through every season of childhood, you grew in kindness, curiosity, and grace — always with that unforgettable smile.',
    icon: '✨',
  },
  {
    title: 'Dream Chaser',
    text: 'You never let fear hold you back. With courage and determination, you pursued your dreams and inspired everyone around you.',
    icon: '💫',
  },
  {
    title: 'Strong Woman',
    text: 'Through every challenge, you stood tall though short. Your strength is impressive.',
    icon: '💪',
  },
  {
    title: 'Beautiful Soul',
    text: 'Beyond the surface, your soul shines — gentle, generous, and endlessly kind. A beauty that only deepens with time.',
    icon: '🌷',
  },
  {
    title: 'Best Sister',
    text: 'You have always been more than a sister — you are a protector, a confidante, and one of the greatest blessings of my life.',
    icon: '❤️',
  },
  {
    title: 'Today We Celebrate You',
    text: 'All the love you have given, all the lives you have touched — today, it all comes back to you. Happy Birthday, Tracy.',
    icon: '🎉',
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const items = sectionRef.current?.querySelectorAll('.timeline-item');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="timeline-section" id="timeline">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <p className="section-tag mb-3">Her Journey</p>
          <h2 className="section-title">A Beautiful Life, Beautifully Lived</h2>
          <div className="flex justify-center mt-6">
            <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, #d4a843, transparent)' }} />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-line" />

          {milestones.map((m, i) => (
            <div key={i} className="timeline-item fade-in" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="text-3xl mb-2">{m.icon}</div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2d1b35' }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#5a3d6b', fontSize: '1.1rem' }}
                >
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
