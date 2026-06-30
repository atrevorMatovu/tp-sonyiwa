export default function Footer() {
  return (
    <footer
      className="py-12 text-center"
      style={{
        background: 'linear-gradient(180deg, #1a0f20, #0d0810)',
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <div className="flex justify-center mb-4">
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #d4a843, transparent)' }} />
      </div>
      <p
        className="text-sm tracking-widest"
        style={{ color: 'rgba(252, 228, 236, 0.6)' }}
      >
        Made with <span style={{ color: '#f4a7b9' }}>❤️</span> by your younger brother
      </p>
      <p
        className="text-xs mt-2 italic"
        style={{ color: 'rgba(212, 168, 67, 0.5)', fontFamily: "'Cormorant Garamond', serif" }}
      >
        For Tracy, on her special day
      </p>
    </footer>
  );
}
