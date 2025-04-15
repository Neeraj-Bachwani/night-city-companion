"use client";
import { useState, useEffect, useCallback } from 'react';

const DATA_PATTERNS = [
  // Easy - obvious patterns
  { pattern: "34-23", difficulty: "easy", code: "> decrypt --sequence=34-23" },
  { pattern: "MAX", difficulty: "easy", code: "> override --user=MAX" },
  
  // Medium - slightly hidden
  { pattern: "0x4A3F", difficulty: "medium", code: "> memory --address=0x4A3F" },
  { pattern: "ICE-9", difficulty: "medium", code: "> firewall --protocol=ICE-9" },
  
  // Hard - well hidden
  { pattern: "SILVERHAND", difficulty: "hard", code: "> access --id=SILVERHAND" },
  { pattern: "42.191", difficulty: "hard", code: "> coordinates --location=42.191" }
];

const GIBBERISH_CHARS = "!@#$%^&*()_+-=[]{};':\",./<>?~\\|";
const LINE_LENGTH = 60;
const LINES_COUNT = 15;

export default function DataScrambleGame({ difficulty = "medium", onComplete }) {
  const [scrambledData, setScrambledData] = useState([]);
  const [target, setTarget] = useState("");
  const [found, setFound] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [message, setMessage] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [timerActive, setTimerActive] = useState(true);

  // Generate scrambled data with hidden pattern
  const generateData = useCallback(() => {
    const patterns = DATA_PATTERNS.filter(p => p.difficulty === difficulty);
    const { pattern, code } = patterns[Math.floor(Math.random() * patterns.length)];
    setTarget(pattern);
    
    const data = [];
    // Insert target in random position
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

  // Handle text selection
  const handleTextSelect = () => {
    const selection = window.getSelection().toString().trim();
    if (selection && !found) {
      setSelectedText(selection);
      if (selection === target) {
        setFound(true);
        setTimerActive(false);
        setMessage("SEQUENCE VERIFIED!");
        setTimeout(() => onComplete(true), 1500);
      }
    }
  };

  // Initialize game
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

  // Check time
  useEffect(() => {
    if (timeLeft <= 0 && !found) {
      setTimerActive(false);
      setMessage("SYSTEM LOCKOUT: Too slow!");
      setTimeout(() => onComplete(false), 1500);
    }
  }, [timeLeft, found, onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 font-mono">
      <div className="bg-gray-900 border-2 border-cyan-500 rounded-md w-full max-w-2xl relative">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-800 p-2 border-b border-cyan-400">
          <span className="text-cyan-400">data_scanner.exe</span>
          <div className="text-yellow-400">TIME: {Math.max(0, timeLeft)}s</div>
        </div>

        {/* Message */}
        {message && (
          <div className={`absolute top-20 left-0 right-0 mx-auto w-max px-4 py-2 rounded-md z-10 
            ${message.includes("VERIFIED") ? "bg-green-900 text-green-100" : 
              "bg-red-900 text-red-100"}`}>
            {message}
          </div>
        )}

        {/* Instructions */}
        <div className="p-2 text-xs text-cyan-300 border-b border-gray-700">
          // SELECT THE HIDDEN SEQUENCE WITH YOUR CURSOR
        </div>

        {/* Scrambled Data */}
        <div 
          className="p-4 text-green-400 h-96 overflow-y-auto select-text cursor-text"
          onMouseUp={handleTextSelect}
        >
          {scrambledData.map((line, i) => (
            <div key={i} className="mb-1 font-mono tracking-tighter select-text">
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
                    className={`
                      ${isTarget && found ? "text-yellow-300 bg-gray-700" : ""}
                      ${isSelected ? "bg-cyan-900 text-white" : ""}
                    `}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="bg-gray-800 p-2 border-t border-cyan-400 text-xs">
          {selectedText && (
            <div className="text-cyan-300 mb-1">
              SELECTED: <span className="text-yellow-300">{selectedText}</span>
            </div>
          )}
          <div className="text-purple-300">
            TARGET: <span className="text-yellow-300">{target}</span>
          </div>
        </div>
      </div>
    </div>
  );
}