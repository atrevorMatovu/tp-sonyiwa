import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.12);
  const volumeRef = useRef(0.12);
  volumeRef.current = volume;

  const audioRef = useRef<{
    play: () => void;
    stop: () => void;
    setVolume: (val: number) => void;
  } | null>(null);

  const hasAttemptedAutoplay = useRef(false);

  useEffect(() => {
    // Create a soft piano melody using Web Audio API
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const masterGain = audioCtx.createGain();
    masterGain.gain.value = volumeRef.current;
    masterGain.connect(audioCtx.destination);

    // Simple reverb-like effect with delay
    const delay = audioCtx.createDelay();
    delay.delayTime.value = 0.3;
    const feedback = audioCtx.createGain();
    feedback.gain.value = 0.3;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(masterGain);

    // Melody notes (frequencies) - a gentle, warm progression
    const notes = [
      523.25, 587.33, 659.25, 698.46, 783.99, 880.0, // C5 D5 E5 F5 G5 A5
    ];

    // Happy Birthday melody (simplified, gentle)
    const melody = [
      { note: 0, dur: 0.4 }, { note: 0, dur: 0.2 }, { note: 1, dur: 0.6 },
      { note: 0, dur: 0.6 }, { note: 3, dur: 0.6 }, { note: 2, dur: 1.2 },
      { note: 0, dur: 0.4 }, { note: 0, dur: 0.2 }, { note: 1, dur: 0.6 },
      { note: 0, dur: 0.6 }, { note: 4, dur: 0.6 }, { note: 3, dur: 1.2 },
      { note: 0, dur: 0.4 }, { note: 0, dur: 0.2 }, { note: 5, dur: 0.6 },
      { note: 3, dur: 0.6 }, { note: 2, dur: 0.6 }, { note: 1, dur: 1.2 },
      { note: 3, dur: 0.4 }, { note: 3, dur: 0.2 }, { note: 2, dur: 0.6 },
      { note: 1, dur: 0.6 }, { note: 0, dur: 1.2 },
    ];

    let timeoutId: ReturnType<typeof setTimeout>;
    let melodyIndex = 0;
    let stopped = false;

    const playNote = (freq: number, duration: number) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;

      // Soft envelope
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(masterGain);
      gain.connect(delay);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    };

    const playMelody = () => {
      if (stopped) return;
      const { note, dur } = melody[melodyIndex];
      playNote(notes[note], dur);
      melodyIndex = (melodyIndex + 1) % melody.length;
      timeoutId = setTimeout(playMelody, dur * 1000);
    };

    // Store control functions
    audioRef.current = {
      play: () => {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        stopped = false;
        playMelody();
      },
      stop: () => {
        stopped = true;
        clearTimeout(timeoutId);
        masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
        masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
        setTimeout(() => {
          masterGain.gain.value = volumeRef.current;
        }, 100);
      },
      setVolume: (val: number) => {
        masterGain.gain.setValueAtTime(val, audioCtx.currentTime);
      },
    };

    // Attempt autoplay on first user interaction (browser policy)
    const attemptAutoplay = () => {
      if (hasAttemptedAutoplay.current) return;
      hasAttemptedAutoplay.current = true;
      if (audioCtx.state === 'suspended') audioCtx.resume();
      stopped = false;
      setPlaying(true);
      playMelody();
      document.removeEventListener('click', attemptAutoplay);
      document.removeEventListener('keydown', attemptAutoplay);
      document.removeEventListener('touchstart', attemptAutoplay);
    };

    document.addEventListener('click', attemptAutoplay);
    document.addEventListener('keydown', attemptAutoplay);
    document.addEventListener('touchstart', attemptAutoplay);

    return () => {
      stopped = true;
      clearTimeout(timeoutId);
      audioCtx.close();
      document.removeEventListener('click', attemptAutoplay);
      document.removeEventListener('keydown', attemptAutoplay);
      document.removeEventListener('touchstart', attemptAutoplay);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.stop();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.setVolume(val);
    }
  };

  return (
    <div id="music-player">
      <button className="music-btn" onClick={togglePlay} aria-label={playing ? 'Pause music' : 'Play music'}>
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 4 20 12 6 20" />
          </svg>
        )}
      </button>
      
      <div className="flex flex-col items-start gap-0.5">
        <div className="flex items-center gap-1.5">
          <span className="music-label">
            {playing ? 'Now Playing' : 'Play Music'}
          </span>
          {playing && (
            <div className="flex items-end gap-0.5" style={{ height: '10px' }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '1.5px',
                    background: 'linear-gradient(180deg, #f4a7b9, #d4a843)',
                    borderRadius: '1px',
                    animation: `musicBar 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                    height: '100%',
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Volume slider control */}
        <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity mt-0.5">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5a3d6b" strokeWidth="2.5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <input
            type="range"
            min="0"
            max="0.4"
            step="0.02"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              width: '50px',
              height: '3px',
              cursor: 'pointer',
              accentColor: '#d4a843',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes musicBar {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
