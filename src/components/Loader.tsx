interface LoaderProps {
  hidden: boolean;
}

export default function Loader({ hidden }: LoaderProps) {
  return (
    <div id="loader" className={hidden ? 'hidden' : ''}>
      <div className="flex flex-col items-center gap-6">
        <svg className="loader-heart" viewBox="0 0 100 90" fill="none">
          <path
            d="M50 85 C50 85 5 55 5 28 C5 14 16 5 28 5 C37 5 45 10 50 18 C55 10 63 5 72 5 C84 5 95 14 95 28 C95 55 50 85 50 85Z"
            fill="url(#loaderGrad)"
          />
          <defs>
            <linearGradient id="loaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4a7b9" />
              <stop offset="100%" stopColor="#d4a843" />
            </linearGradient>
          </defs>
        </svg>
        <p
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className="text-2xl italic font-light text-pink-400 tracking-widest"
        >
          A gift for Tracy...
        </p>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-pink-300"
              style={{ animation: `loaderDot 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes loaderDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
