"use client";
import { MapPin, Clock, Users, Eye } from 'lucide-react';

// Sample event data (same as before)
const events = [{
    id: 1,
    title: "Arasaka Tower Infiltration",
    description: "High-risk operation with substantial reward. Stealth required.",
    location: "City Center",
    time: "22:00",
    participants: 4,
    priority: "high"
  },
  {
    id: 2,
    title: "Maelstrom Gang Meetup",
    description: "Information exchange with the chrome-heads. Watch your back.",
    location: "Watson",
    time: "23:30",
    participants: 2,
    priority: "medium"
  },
  {
    id: 3,
    title: "Ripperdoc Appointment",
    description: "New cyberware installation. Premium quality, no questions asked.",
    location: "Kabuki",
    time: "20:15",
    participants: 1,
    priority: "low"
  },]; 

export default function EventPanel() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-cyan-400 border-b border-cyan-400 pb-2 mb-4">
        // UPCOMING EVENTS
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="border-l-4 border-cyan-500 bg-gray-800 p-4 rounded-r-lg shadow-lg hover:shadow-cyan-500/10 transition-all">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
        <p className="text-gray-300 text-sm mt-1">{event.description}</p>
      </div>
      
      <div className="space-y-2 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>{event.participants} participant{event.participants !== 1 ? 's' : ''}</span>
        </div>
      </div>
      
      <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm border border-gray-600 rounded hover:border-cyan-400 hover:text-cyan-400 transition-colors">
        <Eye className="w-4 h-4" />
        View Details
      </button>
    </div>
  );
}