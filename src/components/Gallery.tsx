import { useState } from 'react';

const galleryImages = [
  {
    src: '/carousel-images/Tracy 20180217_222143.jpg',
    caption: 'Always beautiful — from the very beginning',
    date: '2018',
  },
  {
    src: '/carousel-images/IMG_20190405_214253.jpg',
    caption: 'Carefree moments & a smile that never fades',
    date: '2019',
  },
  {
    src: '/carousel-images/IMG_20221105_154627_820.jpg',
    caption: 'Grace, elegance, and a heart full of love',
    date: '2022',
  },
  {
    src: '/carousel-images/Screenshot_20240519_221244.jpg',
    caption: 'A screenshot of pure joy and laughter',
    date: '2024',
  },
  {
    src: '/carousel-images/Screenshot_20240522-190757_Photos.jpg',
    caption: 'Sweet captures & memories to keep',
    date: '2024',
  },
  {
    src: '/carousel-images/20240623_100540-COLLAGE.jpg',
    caption: 'Beautiful collage of special memories',
    date: '2024',
  },
  {
    src: '/carousel-images/20240623_100541.jpg',
    caption: 'Radiant moments of happiness',
    date: '2024',
  },
  {
    src: '/carousel-images/IMG-20240627-WA0000.jpg',
    caption: 'Warm and genuine smiles',
    date: '2024',
  },
  {
    src: '/carousel-images/IMG-20250313-WA0011.jpg',
    caption: 'Shining bright through the seasons',
    date: '2025',
  },
  {
    src: '/carousel-images/IMG-20250313-WA0012.jpg',
    caption: 'Elegance and inner peace',
    date: '2025',
  },
  {
    src: '/carousel-images/IMG-20260404-WA0002.jpg',
    caption: 'Confidence and grace in every step',
    date: '2026',
  },
  {
    src: '/carousel-images/IMG-20260404-WA0003.jpg',
    caption: 'Pure happiness captured in time',
    date: '2026',
  },
  {
    src: '/carousel-images/IMG-20260628-WA0001.jpg',
    caption: 'Cherishing the modern moments',
    date: '2026',
  },
  {
    src: '/carousel-images/IMG-20260628-WA0007.jpg',
    caption: 'Beautiful today, tomorrow, and forever',
    date: '2026',
  },
];

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhoto(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActivePhoto(null);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto !== null) {
      setActivePhoto((activePhoto + 1) % galleryImages.length);
    }
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhoto !== null) {
      setActivePhoto((activePhoto - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section className="gallery-section py-20 px-6" id="gallery">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <p className="section-tag mb-3">Memory Album</p>
          <h2 className="section-title">Tracy's Gallery of Moments</h2>
          <div className="flex justify-center mt-6">
            <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, transparent, #d4a843, transparent)' }} />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((photo, i) => (
            <div
              key={i}
              className="gallery-card fade-in cursor-pointer relative overflow-hidden rounded-2xl group border border-pink-100"
              style={{ transitionDelay: `${i * 0.05}s` }}
              onClick={() => openLightbox(i)}
            >
              {/* Photo Wrapper */}
              <div className="aspect-[3/4] overflow-hidden bg-purple-50">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b35]/90 via-[#2d1b35]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs text-yellow-400 font-bold tracking-widest uppercase mb-1">{photo.date}</span>
                <p className="text-sm text-pink-50 font-medium line-clamp-2 italic">{photo.caption}</p>
              </div>

              {/* Tiny date tag in non-hover */}
              <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-purple-900 group-hover:opacity-0 transition-opacity duration-300">
                {photo.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto !== null && (
        <div
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-all"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
            onClick={showPrev}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
            onClick={showNext}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Image & Caption Container */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[activePhoto].src}
              alt={galleryImages[activePhoto].caption}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/10"
            />
            <div className="text-center mt-6 max-w-2xl px-4">
              <span className="text-xs text-yellow-400 font-bold tracking-[0.2em] uppercase mb-1 block">
                {galleryImages[activePhoto].date}
              </span>
              <p className="text-lg md:text-xl text-pink-50/90 font-cormorant italic font-light">
                "{galleryImages[activePhoto].caption}"
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
