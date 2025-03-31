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
    <div className="neon-box">
      <h2 className="text-lg font-semibold mb-2">// SYSTEM CLOCK</h2>
      <p className="text-2xl font-mono">{formattedTime}</p>
      <p className="text-sm opacity-80">{formattedDate.toUpperCase()}</p>
    </div>
  );
}