import { useState, useEffect, useRef, useCallback } from 'react';

// Photos ordered chronologically — Tracy's journey from childhood to today.
import photo1 from '../assets/images/Tracy_20180217_222143.jpg';
import photo2 from '../assets/images/IMG_20190405_214253.jpg';
import photo3 from '../assets/images/IMG_20221105_154627_820.jpg';

const slides = [
  {
    src: photo1,
    caption: 'Always beautiful — from the very beginning',
    position: 'center top',
  },
  {
    src: photo2,
    caption: 'Carefree moments & a smile that never fades',
    position: 'center center',
  },
  {
    src: photo3,
    caption: 'Grace, elegance, and a heart full of love',
    position: 'center top',
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number>(0);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 1200);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5500);
  };

  const handlePrev = () => { prev(); resetInterval(); };
  const handleNext = () => { next(); resetInterval(); };
  const handleDot = (i: number) => { goTo(i); resetInterval(); };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <section id="carousel" className="relative">
      <div
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, i) => (
          <div key={i} className={`carousel-slide ${i === current ? 'active' : ''}`}>
            <img
              src={slide.src}
              alt={slide.caption}
              style={{ objectPosition: slide.position }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="carousel-overlay" />
            <div className="carousel-caption">
              {i === current && (
                <h3 key={current}>{slide.caption}</h3>
              )}
            </div>
          </div>
        ))}

        {/* Nav arrows */}
        <button className="carousel-nav prev" onClick={handlePrev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="carousel-nav next" onClick={handleNext} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              onClick={() => handleDot(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Section label */}
      <div
        className="absolute top-6 left-0 right-0 text-center z-10"
        style={{ pointerEvents: 'none' }}
      >
        <span
          className="glass px-6 py-2 rounded-full text-xs tracking-[0.3em] uppercase inline-block"
          style={{ color: 'rgba(212,168,67,0.9)', fontFamily: "'Lato', sans-serif" }}
        >
          Memories of Tracy
        </span>
      </div>
    </section>
  );
}
