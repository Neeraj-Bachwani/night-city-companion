"use client";
import React, { useState, useRef, useEffect } from 'react';

const MusicPanel = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isHoldingN, setIsHoldingN] = useState(false);
  const audioRef = useRef(null);
  const hasInteractedRef = useRef(false);
  const skipTriggeredRef = useRef(false);

  const tracks = [
    { file: "/songs/Track1.mp3", title: "NEON_GRID", artist: "SYNTHLORD" },
    { file: "/songs/Track2.mp3", title: "CYBER_RAVE", artist: "DJ NULL" },
    { file: "/songs/Track3.mp3", title: "WIRED_DREAMS", artist: "TECHNO-MANCER" },
    { file: "/songs/Track4.mp3", title: "DATA_STORM", artist: "RIOT_GRRL.exe" },
    { file: "/songs/Track5.mp3", title: "ICE_BREAKER", artist: "NULL_SECTOR" }
  ];

  const handleUserInteraction = () => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      audioRef.current.play().catch(e => console.log(e));
    }
  };

  useEffect(() => {
    audioRef.current.src = tracks[currentTrack].file;
    audioRef.current.volume = volume;
    if (hasInteractedRef.current) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'n' || e.key === 'N') {
        if (!skipTriggeredRef.current) {
          setIsHoldingN(true);
          skipTriggeredRef.current = true;
          setTimeout(() => {
            setCurrentTrack(prev => (prev + 1) % tracks.length);
            setIsHoldingN(false);
            skipTriggeredRef.current = false;
          }, 500);
        }
      } else if (e.key === 'a' || e.key === 'A') {
        setVolume(prev => Math.max(0, prev - 0.1));
      } else if (e.key === 'd' || e.key === 'D') {
        setVolume(prev => Math.min(1, prev + 0.1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={styles.panelContainer} onClick={handleUserInteraction}>
      <div style={styles.headerContainer}>
        <div style={styles.solidBar}></div>
        <div style={styles.textBox}>
          <span style={styles.chipText}>// MUSIC PLAYER [click anywhere in the music panel to play the song]</span>
        </div>
      </div>

      <div style={styles.playerRow}>
        <img src="/images/music-comp/music-art.png" alt="Music Art" style={styles.albumArt}/>
        <div style={styles.controlsWrapper}>
          <div style={styles.trackInfo}>
            <span style={styles.trackTitle}>{tracks[currentTrack].title}</span>
            <span style={styles.trackArtist}> - {tracks[currentTrack].artist}</span>
          </div>

          <div style={styles.controlsContainer}>
            <div style={styles.controls}>
              <div style={styles.nextControl}>
                <div style={{...styles.nextButton, ...(isHoldingN && styles.holdingButton)}}>
                  <div style={styles.nextInner}>N</div>
                </div>
                <div style={styles.nextText}>HOLD TO SKIP</div>
              </div>
              
              <div style={styles.volumeSection}>
                <div style={styles.volumeLabel}>VOLUME (A/D KEYS):</div>
                <div style={styles.volumeControls}>
                  <span style={styles.volumeKey}>A</span>
                  <div style={styles.volumeBar}>
                    <div style={{...styles.volumeLevel, width: `${volume * 100}%`}}/>
                  </div>
                  <span style={styles.volumeKey}>D</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <audio ref={audioRef} loop style={{ display: 'none' }}/>
      </div>
    </div>
  );
};

const styles = {
  panelContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: 'transparent',
    gap: '1rem',
    padding: '1rem'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '30px',
    background: 'transparent',
    gap: '4px',
    paddingLeft: '4px',
  },
  solidBar: {
    width: '8px',
    height: '100%',
    backgroundColor: 'var(--accent-red)',
    flexShrink: 0
  },
  textBox: {
    flex: 1,
    height: '100%',
    border: '2px solid var(--accent-red)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    background: 'transparent'
  },
  chipText: {
    color: 'var(--accent-red)',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap'
  },
  playerRow: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start'
  },
  albumArt: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
  },
  controlsWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: '200px'
  },
  trackInfo: {
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-mono)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    letterSpacing: '0.05em'
  },
  trackTitle: {
    color: 'var(--accent-red)'
  },
  trackArtist: {
    color: 'rgba(234, 85, 71, 0.7)'
  },
  controlsContainer: {
    border: '1px dashed var(--accent-red)',
    padding: '1rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  nextControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  nextButton: {
    width: '40px',
    height: '40px',
    border: '2px solid var(--accent-red)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  holdingButton: {
    backgroundColor: 'rgba(234, 85, 71, 0.2)',
    transform: 'scale(0.95)'
  },
  nextInner: {
    color: 'var(--accent-red)',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: 'var(--font-mono)'
  },
  nextText: {
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem'
  },
  volumeSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  volumeLabel: {
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    opacity: 0.8
  },
  volumeControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  volumeKey: {
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    width: '20px',
    textAlign: 'center'
  },
  volumeBar: {
    flex: 1,
    height: '6px',
    backgroundColor: 'rgba(234, 85, 71, 0.2)',
    position: 'relative'
  },
  volumeLevel: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'var(--accent-red)',
    transition: 'width 0.1s ease'
  }
};

export default MusicPanel;