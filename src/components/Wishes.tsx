
const wishes = [
  'Wishing you endless happiness.',
  'May this year bring every blessing.',
  'Keep shining, always.',
  'The best is yet to come.',
  'May God continue to guide your journey.',
];

export default function Wishes() {
  const visible = true;

  return (
    <section className="wishes-section" id="wishes">
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

        {/* Celebrate button */}
        <div className="flex justify-center mt-12 fade-in">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('trigger-confetti'))}
            className="glass px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--blush), var(--gold))',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 20px rgba(244, 167, 185, 0.4)',
              cursor: 'pointer',
            }}
          >
            Celebrate Again 🎉
          </button>
        </div>
      </div>
    </section>
  );
}
