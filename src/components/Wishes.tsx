import { useEffect, useRef, useState } from 'react';

const wishes = [
  'Wishing you endless happiness.',
  'May this year bring every blessing.',
  'Keep shining, always.',
  'The best is yet to come.',
  'May God continue to guide your journey.',
];

export default function Wishes() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="wishes-section" id="wishes">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <p className="section-tag mb-3">Sent With Love</p>
          <h2 className="section-title">Birthday Wishes</h2>
          <div className="flex justify-center mt-6">
            <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, #d4a843, transparent)' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((w, i) => (
            <div
              key={i}
              className="wish-card fade-in"
              style={{
                transitionDelay: `${i * 0.12}s`,
                gridColumn: i === 4 && visible ? '1 / -1' : undefined,
                maxWidth: i === 4 ? '500px' : undefined,
                margin: i === 4 ? '0 auto' : undefined,
              }}
            >
              <div className="text-2xl mb-2">✨</div>
              <p>{w}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
