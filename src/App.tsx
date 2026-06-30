import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import Hero from './components/Hero';
import Carousel from './components/Carousel';
import Timeline from './components/Timeline';
import Letter from './components/Letter';
import Reasons from './components/Reasons';
import Quote from './components/Quote';
import Wishes from './components/Wishes';
import FinalSection from './components/FinalSection';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import FloatingEffects from './components/FloatingEffects';

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Loader hidden={!loading} />

      {/* Scroll progress */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Floating particles & sparkles */}
      <FloatingEffects />

      {/* Main content */}
      <main>
        <Hero />
        <Carousel />
        <Timeline />
        <Letter />
        <Reasons />
        <Quote />
        <Wishes />
        <FinalSection />
      </main>

      <Footer />

      {/* Music player */}
      <MusicPlayer />

      {/* Back to top */}
      <button
        id="back-to-top"
        className={showBackToTop ? 'visible' : ''}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </>
  );
}

export default App;
