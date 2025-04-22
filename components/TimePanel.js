"use client";
import { useState, useEffect } from 'react';

export default function TimePanel() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false,
  }).replace(/ AM | PM/, '').replace(/ a.m. | p.m./, '');

  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  });

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <h2 style={styles.header}>// SYSTEM CLOCK</h2>
        <div style={styles.signalStrength}>
          {[4, 6, 8].map((height, index) => (
            <span 
              key={index}
              style={{
                ...styles.signalBar,
                height: `${height}px`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
          <span style={styles.signalText}>SYNC</span>
        </div>
      </div>
      <div style={styles.timeDisplay}>
        <p style={styles.time}>{formattedTime}</p>
        <p style={styles.date}>{formattedDate.toUpperCase()}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'rgba(27, 19, 72, 0.3)',
    border: '1px solid var(--neon-green)',
    borderRadius: '4px',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  header: {
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    margin: 0,
  },
  timeDisplay: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  time: {
    color: 'var(--neon-green)',
    fontFamily: 'var(--font-mono)',
    fontSize: '1.75rem',
    fontWeight: '600',
    margin: 0,
    letterSpacing: '0.05em',
  },
  date: {
    color: 'var(--neon-green)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    opacity: 0.8,
    margin: 0,
    letterSpacing: '0.05em',
  },
  signalStrength: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '1rem', 
    gap: '3px',
  },
  signalBar: {
    width: '3px',
    backgroundColor: 'var(--neon-green)',
    opacity: 0.7,
    animation: 'pulse 1.5s infinite ease-in-out',
    alignSelf: 'flex-end',
  },
  signalText: {
    color: 'var(--neon-green)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    marginLeft: '0.25rem',
    opacity: 0.8,
    letterSpacing: '0.05em',
    lineHeight: '0.6rem',
  }
};