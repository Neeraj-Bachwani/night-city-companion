"use client";
import { useState, useEffect, useCallback } from 'react';

const WORDS = [
  "root", "admin", "sudo", "firewall", "encrypt", 
  "backdoor", "quantum", "neural", "cyberdeck", "ICE",
  "overwatch", "datamine", "zero-day", "soulkiller", "blackICE",
  "Arasaka", "override", "payload", "protocol", "inject", 
  "target", "stealth"
];

const COMMAND_TEMPLATES = [
  "> hack --target={word}",
  "> decrypt --key={word}",
  "> spoof --id={word}",
  "> deploy --payload={word}",
  "> inject --virus={word}",
  "> bypass --security={word}",
  "> activate --module={word}",
  "> override --system={word}"
];

export default function TerminalGame({ mode = "time" }) {
  const [currentWord, setCurrentWord] = useState("");
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(17);
  const [commandLines, setCommandLines] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState(null);

  const newWord = useCallback(() => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setCurrentWord(word);
    setInput("");
  }, []);

  // Initialize game
  useEffect(() => {
    newWord();
    if (mode === "time") {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [newWord, mode]);

  // Check win/lose conditions
  useEffect(() => {
    if (mode === "time" && timeLeft <= 0) {
      setMessage({ text: "Time's up! Firewall reengaged.", type: "error" });
      setTimeout(() => setIsOpen(false), 2000);
    }
    if (mode === "health" && lives <= 0) {
      setMessage({ text: "System lockout detected!", type: "error" });
      setTimeout(() => setIsOpen(false), 2000);
    }
    if (progress >= 8) {
      setMessage({ text: "ACCESS GRANTED. Data exfiltrated.", type: "success" });
      setTimeout(() => setIsOpen(false), 2000);
    }
  }, [timeLeft, lives, progress, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === currentWord) {
      // Add command line immediately after correct input
      const randomTemplate = COMMAND_TEMPLATES[Math.floor(Math.random() * COMMAND_TEMPLATES.length)];
      const newCommand = randomTemplate.replace('{word}', currentWord.toLowerCase());
      setCommandLines(prev => [...prev, newCommand]);
      
      setProgress(p => p + 1);
      newWord();
    } else {
      if (mode === "health") setLives(l => l - 1);
      setInput("");
      setMessage({ text: "Incorrect! Try again.", type: "warning" });
      setTimeout(() => setMessage(null), 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 font-mono">
      <div className="bg-gray-900 border-2 border-cyan-500 rounded-md w-full max-w-2xl relative">
        {/* Terminal Header */}
        <div className="flex justify-between items-center bg-gray-800 p-2 border-b border-cyan-400">
          <span className="text-cyan-400">root@nightcity:~</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-red-500 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`absolute top-20 left-0 right-0 mx-auto w-max px-4 py-2 rounded-md z-10 
            ${message.type === "error" ? "bg-red-900 text-red-100" : 
              message.type === "success" ? "bg-green-900 text-green-100" : 
              "bg-yellow-900 text-yellow-100"}`}>
            {message.text}
          </div>
        )}

        {/* Terminal Body */}
        <div className="p-4 text-green-400 h-96 overflow-y-auto">
          {commandLines.map((line, i) => (
            <div key={i} className="mb-1">
              <span className="text-cyan-300">$</span> {line}
            </div>
          ))}
          
          <div className="mt-4 mb-2">
            <p className="text-yellow-300">Type: <span className="text-white">{currentWord}</span></p>
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="flex items-center">
                <span className="text-cyan-300 mr-2">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-black text-green-400 border-b border-green-500 px-2 py-1 w-full focus:outline-none"
                  autoFocus
                />
              </div>
            </form>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-800 p-2 border-t border-cyan-400">
          <div className="flex justify-between items-center text-xs">
            {mode === "health" ? (
              <span className="text-red-400">
                LIVES: {Array(lives).fill("♥").join(" ")}
              </span>
            ) : (
              <span className="text-yellow-400">
                TIME: {timeLeft}s
              </span>
            )}
            
            <div className="w-1/2 bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-cyan-500 h-2.5 rounded-full" 
                style={{ width: `${(progress / 8) * 100}%` }}
              />
            </div>
            
            <span className="text-cyan-400">
              PROGRESS: {progress}/8
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}