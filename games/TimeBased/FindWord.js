"use client";
import { useState, useEffect, useCallback } from 'react';

const DATA_PATTERNS = [
  { pattern: "34-23", difficulty: "easy" },
  { pattern: "MAX", difficulty: "easy" },
  { pattern: "0x4A3F", difficulty: "medium"  },
  { pattern: "ICE-9", difficulty: "medium" },
  { pattern: "SILVERHAND", difficulty: "hard" },
  { pattern: "42.191", difficulty: "hard" }
];

const GIBBERISH_CHARS = "!@#$%^&*()_+-=[]{};':\",./<>?~\\|";
const LINE_LENGTH = 60;
const LINES_COUNT = 15;

export default function DataScrambleGame({ difficulty = "medium", onComplete }) {
  const [scrambledData, setScrambledData] = useState([]);
  const [target, setTarget] = useState("");
  const [found, setFound] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [message, setMessage] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [timerActive, setTimerActive] = useState(true);

  const generateData = useCallback(() => {
    const patterns = DATA_PATTERNS.filter(p => p.difficulty === difficulty);
    const { pattern, code } = patterns[Math.floor(Math.random() * patterns.length)];
    setTarget(pattern);
    
    const data = [];
    const targetLine = Math.floor(Math.random() * LINES_COUNT);
    const targetPos = Math.floor(Math.random() * (LINE_LENGTH - pattern.length));
    
    for (let i = 0; i < LINES_COUNT; i++) {
      let line = "";
      for (let j = 0; j < LINE_LENGTH; j++) {
        if (i === targetLine && j === targetPos) {
          line += pattern;
          j += pattern.length - 1;
        } else {
          line += GIBBERISH_CHARS[Math.floor(Math.random() * GIBBERISH_CHARS.length)];
        }
      }
      data.push(line);
    }
    
    setScrambledData(data);
    return code;
  }, [difficulty]);

  const handleTextSelect = () => {
    const selection = window.getSelection().toString().trim();
    if (selection && !found) {
      setSelectedText(selection);
      if (selection === target) {
        setFound(true);
        setTimerActive(false);
        setMessage("ACCESS GRANTED: Firewall breached");
        setTimeout(() => onComplete(true), 1500);
      }
    }
  };

  useEffect(() => {
    generateData();
    const timer = timerActive && setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [generateData, timerActive]);

  useEffect(() => {
    if (timeLeft <= 0 && !found) {
      setTimerActive(false);
      setMessage("MISSION FAILED: Arasaka countermeasures activated");
      setTimeout(() => onComplete(false), 1500);
    }
  }, [timeLeft, found, onComplete]);

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span>// DATASTREAM DECRYPTION</span>
          <div style={styles.timer}>
            TIME REMAINING: <span style={styles.timerValue}>{Math.max(0, timeLeft)}s</span>
          </div>
        </div>

        {/* Instructions */}
        <div style={styles.instructions}>
          // SELECT THE HIDDEN SEQUENCE WITH YOUR CURSOR
        </div>

        {/* Message overlay */}
        {message && (
          <div style={{
            ...styles.message,
            ...(message.includes("GRANTED") ? styles.messageSuccess : styles.messageError)
          }}>
            {message}
          </div>
        )}

        {/* Data display */}
        <div 
          style={styles.display}
          onMouseUp={handleTextSelect}
        >
          {scrambledData.map((line, i) => (
            <div key={i} style={styles.line}>
              {line.split("").map((char, j) => {
                const isTarget = line.includes(target) && 
                  j >= line.indexOf(target) && 
                  j < line.indexOf(target) + target.length;
                const isSelected = selectedText.includes(char) && 
                  j >= line.indexOf(selectedText) && 
                  j < line.indexOf(selectedText) + selectedText.length;
                
                return (
                  <span 
                    key={j} 
                    style={{
                      ...(isTarget && found ? styles.targetChar : {}),
                      ...(isSelected ? styles.selectedChar : {})
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          {selectedText && (
            <div style={styles.selection}>
              SELECTED: <span style={styles.selectionValue}>{selectedText}</span>
            </div>
          )}
          <div style={styles.targetDisplay}>
            TARGET: <span style={styles.targetValue}>{target}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    fontFamily: 'var(--font-mono)'
  },
  container: {
    backgroundColor: 'rgba(27, 19, 72, 0.5)',
    border: '1px solid var(--neon-green)',
    borderRadius: '4px',
    width: '100%',
    maxWidth: '800px',
    position: 'relative',
    boxShadow: '0 0 15px var(--neon-green)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(27, 19, 72, 0.7)',
    padding: '0.5rem 1rem',
    borderBottom: '1px solid var(--neon-green)'
  },
  headerSpan: {
    color: 'var(--neon-green)',
    fontSize: '0.9rem'
  },
  timer: {
    color: 'var(--accent-red)',
    fontSize: '0.9rem'
  },
  timerValue: {
    fontWeight: 'bold'
  },
  instructions: {
    padding: '0.5rem 1rem',
    color: 'var(--neon-blue)',
    fontSize: '0.75rem',
    borderBottom: '1px solid var(--neon-green)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  message: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '1rem 2rem',
    borderRadius: '4px',
    zIndex: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    boxShadow: '0 0 10px currentColor'
  },
  messageSuccess: {
    backgroundColor: 'rgba(0, 128, 0, 0.8)',
    border: '1px solid var(--neon-green)'
  },
  messageError: {
    backgroundColor: 'rgba(234, 85, 71, 0.8)',
    border: '1px solid var(--accent-red)'
  },
  display: {
    padding: '1rem',
    color: 'var(--neon-green)',
    height: '400px',
    overflowY: 'auto',
    userSelect: 'text',
    cursor: 'text',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  line: {
    marginBottom: '0.25rem',
    letterSpacing: '0.05em'
  },
  targetChar: {
    color: 'var(--neon-blue)',
    backgroundColor: 'rgba(0, 240, 255, 0.2)'
  },
  selectedChar: {
    color: 'white',
    backgroundColor: 'rgba(0, 240, 255, 0.4)'
  },
  footer: {
    backgroundColor: 'rgba(27, 19, 72, 0.7)',
    padding: '0.5rem 1rem',
    borderTop: '1px solid var(--neon-green)',
    fontSize: '0.8rem'
  },
  selection: {
    color: 'var(--neon-blue)',
    marginBottom: '0.5rem'
  },
  selectionValue: {
    color: 'var(--accent-red)',
    fontWeight: 'bold'
  },
  targetDisplay: {
    color: 'var(--neon-green)'
  },
  targetValue: {
    color: 'var(--accent-red)',
    fontWeight: 'bold'
  }
};