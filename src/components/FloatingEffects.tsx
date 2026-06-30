import { useEffect, useRef } from 'react';

export default function FloatingEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const triggerConfetti = () => {
      const colors = ['#f4a7b9', '#d4a843', '#e8d5f0', '#fce4ec', '#ffffff', '#e91e63'];
      for (let i = 0; i < 80; i++) {
        setTimeout(() => {
          const piece = document.createElement('div');
          piece.className = 'confetti-piece';
          piece.style.left = Math.random() * 100 + 'vw';
          piece.style.background = colors[Math.floor(Math.random() * colors.length)];
          piece.style.animationDuration = Math.random() * 2.5 + 2.5 + 's';
          piece.style.width = Math.random() * 8 + 6 + 'px';
          piece.style.height = piece.style.width;
          if (Math.random() > 0.5) piece.style.borderRadius = '50%';
          document.body.appendChild(piece);
          setTimeout(() => piece.remove(), 5000);
        }, i * 40);
      }
    };

    // Confetti on load
    triggerConfetti();

    // Listen for custom confetti trigger event
    const handleConfettiTrigger = () => {
      triggerConfetti();
    };
    window.addEventListener('trigger-confetti', handleConfettiTrigger);

    // Floating hearts
    const heartInterval = setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = Math.random() * 16 + 10 + 'px';
      heart.style.animationDuration = Math.random() * 4 + 6 + 's';
      heart.style.color = ['#f4a7b9', '#e91e63', '#d4a843'][Math.floor(Math.random() * 3)];
      heart.style.opacity = '0';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 10000);
    }, 1500);

    // Particle canvas (sparkles)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const sparkles: Array<{
      x: number; y: number; size: number; opacity: number;
      twinkle: number; twinkleSpeed: number; color: string;
    }> = [];

    const sparkleColors = ['#f4a7b9', '#d4a843', '#e8d5f0', '#ffffff'];
    for (let i = 0; i < 40; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random(),
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparkles.forEach((s) => {
        s.twinkle += s.twinkleSpeed;
        const op = Math.abs(Math.sin(s.twinkle)) * 0.6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = op;
        ctx.fill();

        // Cross sparkle
        if (s.size > 1.5) {
          ctx.strokeStyle = s.color;
          ctx.globalAlpha = op * 0.5;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - s.size * 2, s.y);
          ctx.lineTo(s.x + s.size * 2, s.y);
          ctx.moveTo(s.x, s.y - s.size * 2);
          ctx.lineTo(s.x, s.y + s.size * 2);
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearInterval(heartInterval);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('trigger-confetti', handleConfettiTrigger);
    };
  }, []);

  return <canvas ref={canvasRef} id="particles-canvas" />;
}
