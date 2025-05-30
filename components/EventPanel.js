"use client";
import { useState } from 'react';
import { MapPin, Clock, Users, X, Terminal } from 'lucide-react';
import TypingTerminal from '@/games/TimeBased/TypingTerminal'; 
import DataScrambleGame from '@/games/TimeBased/FindWord'; 

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

const priorityStyles = {
  high: {
    color: 'var(--accent-red)',
    border: '1px solid var(--accent-red)',
    bg: 'rgba(234, 85, 71, 0.1)',
    shadow: '0 0 15px var(--accent-red)',
    headerBorder: '2px solid var(--accent-red)'
  },
  medium: {
    color: 'var(--neon-green)',
    border: '1px solid var(--neon-green)',
    bg: 'rgba(177, 255, 0, 0.1)',
    shadow: '0 0 15px var(--neon-green)',
    headerBorder: '2px solid var(--neon-green)'
  },
  low: {
    color: 'var(--neon-blue)',
    border: '1px solid var(--neon-blue)',
    bg: 'rgba(0, 240, 255, 0.1)',
    shadow: '0 0 15px var(--neon-blue)',
    headerBorder: '2px solid var(--neon-blue)'
  }
};

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

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setActiveGame(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>// MISSION QUEUE</h2>
      
      <div style={styles.eventList}>
        {events.map((event) => (
          <VerticalEventCard 
            key={event.id} 
            event={event}
            onClick={() => {
              setSelectedEvent(event);
              setActiveGame(null); 
            }}
          />
        ))}
      </div>
      
      {selectedEvent && !activeGame && (
        <div style={styles.modalOverlay}>
          <div style={{
            ...styles.modalContent,
            border: priorityStyles[selectedEvent.priority].border,
            boxShadow: priorityStyles[selectedEvent.priority].shadow,
            backgroundColor: priorityStyles[selectedEvent.priority].bg
          }}>
            <button 
              onClick={handleCloseModal}
              style={{
                ...styles.closeButton,
                color: priorityStyles[selectedEvent.priority].color
              }}
            >
              <X size={20} />
            </button>

            <div style={styles.modalHeader}>
              <h3 style={{
                ...styles.modalTitle,
                color: priorityStyles[selectedEvent.priority].color
              }}>
                {selectedEvent.title}
              </h3>
            </div>
            
            <div style={styles.metaContainer}>
              <div style={styles.metaItem}>
                <MapPin size={16} style={{
                  color: priorityStyles[selectedEvent.priority].color
                }} />
                <span>{selectedEvent.location}</span>
              </div>
              <div style={styles.metaItem}>
                <Clock size={16} style={{
                  color: priorityStyles[selectedEvent.priority].color
                }} />
                <span>{selectedEvent.time}</span>
              </div>
              <div style={styles.metaItem}>
                <Users size={16} style={{
                  color: priorityStyles[selectedEvent.priority].color
                }} />
                <span>
                  {selectedEvent.participants} {selectedEvent.participants === 1 ? 'OPERATIVE' : 'OPERATIVES'}
                </span>
              </div>
            </div>

            <div style={{
              ...styles.section,
              borderLeft: priorityStyles[selectedEvent.priority].headerBorder
            }}>
              <h4 style={{
                ...styles.sectionHeader,
                color: priorityStyles[selectedEvent.priority].color
              }}>
                // BACKSTORY
              </h4>
              <p style={styles.sectionText}>{selectedEvent.backstory}</p>
            </div>

            <div style={{
              ...styles.section,
              borderLeft: priorityStyles[selectedEvent.priority].headerBorder
            }}>
              <h4 style={{
                ...styles.sectionHeader,
                color: priorityStyles[selectedEvent.priority].color
              }}>
                // BRIEFING
              </h4>
              <p style={styles.sectionText}>{selectedEvent.description}</p>
            </div>

            <div style={styles.buttonContainer}>
              {selectedEvent.id === 1 && (
                <button 
                  style={{
                    ...styles.actionButton,
                    border: `1px solid ${priorityStyles[selectedEvent.priority].color}`,
                    color: priorityStyles[selectedEvent.priority].color,
                    ':hover': {
                      backgroundColor: 'rgba(0, 240, 255, 0.2)',
                    }
                  }}
                  onClick={() => handleInitiateTask('typing')}
                >
                  <Terminal size={16} />
                  INITIATE HACK SEQUENCE
                </button>
              )}
              {selectedEvent.id === 2 && (
                <button 
                  style={{
                    ...styles.actionButton,
                    border: `1px solid ${priorityStyles[selectedEvent.priority].color}`,
                    color: priorityStyles[selectedEvent.priority].color,
                    ':hover': {
                      backgroundColor: 'rgba(0, 240, 255, 0.2)',
                    }
                  }}
                  onClick={() => handleInitiateTask('scramble')}
                >
                  <Terminal size={16} />
                  DECRYPT DATASTREAM
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeGame === 'typing' && selectedEvent?.id === 1 && (
        <TypingTerminal 
          onComplete={handleGameComplete}
          difficulty={selectedEvent.priority === 'high' ? 'hard' : 'normal'}
        />
      )}

      {activeGame === 'scramble' && selectedEvent?.id === 2 && (
        <DataScrambleGame 
          difficulty={selectedEvent.priority} 
          onComplete={handleGameComplete}
        /> 
      )}
    </div>
  );
}

function VerticalEventCard({ event, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        ...styles.eventCard,
        borderLeft: `3px solid ${priorityStyles[event.priority].color}`,
        backgroundColor: priorityStyles[event.priority].bg
      }}
    >
      <div style={styles.eventCardHeader}>
        <h3 style={styles.eventTitle}>{event.title}</h3>
        <span style={{
          ...styles.eventType,
          color: priorityStyles[event.priority].color
        }}>
          {event.type.toUpperCase()}
        </span>
      </div>
      <div style={styles.eventMeta}>
        <span style={styles.eventTime}>
          <Clock size={14} style={{ marginRight: '0.25rem', color: priorityStyles[event.priority].color }} />
          {event.time}
        </span>
        <span style={styles.eventLocation}>
          <MapPin size={14} style={{ marginRight: '0.25rem', color: priorityStyles[event.priority].color }} />
          {event.location}
        </span>
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
  header: {
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    marginBottom: '1rem',
    borderBottom: '1px solid var(--accent-red)',
    paddingBottom: '0.5rem',
  },
  eventList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  eventCard: {
    padding: '0.75rem',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(177, 255, 0, 0.15)',
    },
  },
  eventCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.25rem',
  },
  eventTitle: {
    color: 'var(--neon-green)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    fontWeight: '600',
    margin: 0,
    letterSpacing: '0.05em',
  },
  eventType: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    padding: '0.15rem 0.5rem',
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  eventMeta: {
    display: 'flex',
    gap: '1rem',
    fontSize: '0.75rem',
    color: 'var(--neon-blue)',
    fontFamily: 'var(--font-mono)',
  },
  eventTime: {
    display: 'flex',
    alignItems: 'center',
  },
  eventLocation: {
    display: 'flex',
    alignItems: 'center',
  },
  modalOverlay: {
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
    padding: '1rem',
  },
  modalContent: {
    borderRadius: '4px',
    padding: '1.5rem',
    maxWidth: '600px',
    width: '100%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    ':hover': {
      opacity: 0.8,
    }
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '1rem',
  },
  modalTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '1.25rem',
    margin: 0,
    flex: 1,
  },
  priorityBadge: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  metaContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
    fontFamily: 'var(--font-sans)',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--neon-blue)',
    fontSize: '0.9rem',
  },
  
  section: {
    backgroundColor: 'rgba(27, 19, 72, 0.5)',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  sectionHeader: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    marginBottom: '0.5rem',
    letterSpacing: '0.05em',
  },
  sectionText: {
    color: 'var(--neon-blue)',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.9rem',
    lineHeight: '1.5',
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  actionButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};