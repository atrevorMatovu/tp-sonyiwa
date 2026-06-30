
const reasons = [
  { icon: '❤️', title: 'Your Kind Heart', text: 'A heart that gives without measure and loves without condition.' },
  { icon: '🎁', title: 'Your Generosity', text: 'You pour yourself into others, always giving more than you take.' },
  { icon: '😊', title: 'Your Beautiful Smile', text: 'A smile that lights every room and warms every heart.' },
  { icon: '🌸', title: 'Your Gentle Spirit', text: 'Soft, graceful, and calm — your presence is a gift.' },
  { icon: '💪', title: 'Your Strength', text: 'Quiet, unwavering, and inspiring to everyone who knows you.' },
  { icon: '✨', title: 'Your Wisdom', text: 'Insight beyond your years, guidance that always feels right.' },
  { icon: '🤗', title: 'Your Love for Family', text: 'The heart of our family, the one who always brings us together.' },
  { icon: '🌍', title: 'The Difference You Make', text: 'You leave every person and place a little better than you found it.' },
];

export default function Reasons() {
  return (
    <section className="cards-section" id="reasons">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 fade-in">
          <p className="section-tag mb-3">Why We Celebrate You</p>
          <h2 className="section-title">Reasons You're Amazing</h2>
          <div className="flex justify-center mt-6">
            <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, #d4a843, transparent)' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="reason-card fade-in"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="reason-icon" style={{ animationDelay: `${i * 0.2}s` }}>
                {r.icon}
              </span>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "'Playfair Display', serif", color: '#2d1b35' }}
              >
                {r.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#5a3d6b', fontSize: '1rem' }}
              >
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
