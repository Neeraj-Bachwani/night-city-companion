"use client";
import { useState } from 'react';
import { MapPin, Clock, Users, X, Terminal } from 'lucide-react';
import TypingTerminal from '@/games/TimeBased/TypingTerminal'; 
import DataScrambleGame from '@/games/TimeBased/FindWord'; 

// Sample event data
const events = [
  {
    id: 1,
    title: "Arasaka Tower Infiltration",
    description: "High-risk operation with substantial reward. Stealth required.",
    location: "City Center",
    time: "22:00",
    participants: 4,
    priority: "high",
    type: "hack",
    backstory: "The ICE on Arasaka's databank shows vulnerabilities. A 17-second window was detected by your netrunner contact."
  },
  {
    id: 2,
    title: "Maelstrom Gang Meetup",
    description: "Information exchange with the chrome-heads. Watch your back.",
    location: "Watson",
    time: "23:30",
    participants: 2,
    priority: "medium",
    type: "negotiate",
    backstory: "Maelstrom's lieutenant wants proof you're not NCPD. They've requested a face-to-face in their territory."
  },
  {
    id: 3,
    title: "Ripperdoc Appointment",
    description: "New cyberware installation. Premium quality, no questions asked.",
    location: "Kabuki",
    time: "20:15",
    participants: 1,
    priority: "low",
    type: "upgrade", 
    backstory: "That black-market Sandevistan needs firmware updates. The ripperdoc warned about 'unusual activity' in the code."
  }
];

export default function EventPanel() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeGame, setActiveGame] = useState(null);

  const handleInitiateTask = (gameType) => {
    setActiveGame(gameType);
  };

  const handleGameComplete = (success) => {
    setActiveGame(null);
    setSelectedEvent(null);
    alert(success ? "ACCESS GRANTED: Firewall breached" : "MISSION FAILED: Arasaka countermeasures activated");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-cyan-400 border-b border-cyan-400 pb-2 mb-4">
        // UPCOMING EVENTS
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <CompactEventCard 
            key={event.id} 
            event={event}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && !activeGame && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border-2 border-cyan-500 rounded-lg max-w-2xl w-full p-6 relative">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-cyan-400 mb-2">
              {selectedEvent.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                <span>{selectedEvent.participants} participant{selectedEvent.participants !== 1 ? 's' : ''}</span>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded mb-6">
              <h4 className="text-sm font-mono text-cyan-300 mb-2">// BACKSTORY</h4>
              <p className="text-gray-300">{selectedEvent.backstory}</p>
            </div>

            <div className="bg-gray-800 p-4 rounded mb-6">
              <h4 className="text-sm font-mono text-cyan-300 mb-2">// BRIEFING</h4>
              <p className="text-gray-300">{selectedEvent.description}</p>
            </div>

            {/*Test for event 1 */}
            <div className="flex flex-wrap gap-3">
              {selectedEvent.id === 1 && ( 
                <button 
                  onClick={handleInitiateTask('typing')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-cyan-900 hover:bg-cyan-800 rounded-lg transition-colors"
                >
                  <Terminal className="w-5 h-5" />
                  Initiate Hack Sequence
                </button>
              )}
            </div>

              {/*Test for event 2 */}
            <div className="flex flex-wrap gap-3">
              {selectedEvent.id === 2 && ( 
                <button 
                  onClick={handleInitiateTask('scramble')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-cyan-900 hover:bg-cyan-800 rounded-lg transition-colors"
                >
                  <Terminal className="w-5 h-5" />
                  Initiate Hack Sequence
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Terminal Game - Only for Arasaka event */}
      {activeGame === 'typing' && selectedEvent?.id === 1 && (
        <TypingTerminal 
          onComplete={handleGameComplete}
          difficulty={selectedEvent.priority === 'high' ? 'hard' : 'normal'}
        />
      )}

      {activeGame === 'typing' &&  selectedEvent?.id === 2 && (
      <DataScrambleGame 
        difficulty={selectedEvent.priority} 
        onComplete={handleGameComplete}
      /> 
     )
    }

    </div>
  );
}

function CompactEventCard({ event, onClick }) {
  const priorityColors = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-green-500"
  };

  return (
    <div 
      onClick={onClick}
      className={`cursor-pointer border-l-4 ${priorityColors[event.priority]} bg-gray-800 p-4 rounded-r-lg hover:bg-gray-700 transition-colors`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-white truncate">
          {event.title}
        </h3>
        <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
          {event.type.toUpperCase()}
        </span>
      </div>
    </div>
  );
}