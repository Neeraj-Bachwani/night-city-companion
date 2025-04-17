"use client";
import { useState, useEffect } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export default function WeatherPanel() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState(null);
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            setWeather(data);
          } catch (error) {
            setLocationError("Failed to fetch weather.");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setLocationError("Location permission denied.");
          setLoading(false);
        }
      );
    }, []);
  
    if (loading) return (
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <p style={styles.label}>// WEATHER FEED</p>
          <div style={styles.statusLine}>
            <span style={styles.statusIndicator}></span>
            <span style={styles.statusText}>CONNECTING</span>
          </div>
        </div>
        <p style={styles.loadingText}>ACCESSING WEATHER GRID...</p>
      </div>
    );
  
    if (locationError) return (
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <p style={styles.label}>// WEATHER FEED</p>
          <div style={styles.statusLine}>
            <span style={{...styles.statusIndicator, backgroundColor: 'var(--accent-red)'}}></span>
            <span style={{...styles.statusText, color: 'var(--accent-red)'}}>OFFLINE</span>
          </div>
        </div>
        <p style={styles.errorText}>ERROR: {locationError}</p>
      </div>
    );
  
    if (!weather || !weather.weather || !weather.weather[0]) return (
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <p style={styles.label}>// WEATHER FEED</p>
          <div style={styles.statusLine}>
            <span style={styles.statusIndicator}></span>
            <span style={styles.statusText}>LIVE</span>
          </div>
        </div>
        <p style={styles.errorText}>DATA UNAVAILABLE</p>
      </div>
    );
  
    const cyberName = mapWeatherToCyberpunk(weather.weather[0].main);
    const temp = Math.round(weather.main.temp);
    const location = weather.name || "UNKNOWN LOCATION";
  
    return (
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <p style={styles.label}>// WEATHER FEED</p>
          <div style={styles.statusLine}>
            <span style={styles.statusIndicator}></span>
            <span style={styles.statusText}>LIVE</span>
          </div>
        </div>
        
        <div style={styles.weatherContent}>
          <p style={styles.location}>{location}</p>
          <div style={styles.weatherData}>
            <p style={styles.weatherName}>{cyberName}</p>
            <p style={styles.temperature}>{temp}°C</p>
          </div>
        </div>
      </div>
    );
}

function mapWeatherToCyberpunk(condition) {
    switch (condition.toLowerCase()) {
      case "clear": return "NEON GLARE";
      case "clouds": return "CORPO SMOG";
      case "rain": return "CHROME WASH";
      case "drizzle": return "NETRUNNER TEARS";
      case "thunderstorm": return "ARASAKA ALERT";
      case "snow": return "ICE-9 FALLOUT";
      case "mist": return "SOULKILLER MIST";
      case "fog": return "CYBERPSYCHO FOG";
      case "haze": return "DATA STORM";
      default: return condition.toUpperCase();
    }
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
  label: {
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    margin: 0,
  },
  weatherContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  weatherData: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.5rem',
  },
  location: {
    color: 'var(--neon-green)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    opacity: 0.8,
    margin: 0,
    letterSpacing: '0.05em',
  },
  weatherName: {
    color: 'var(--neon-green)',
    fontFamily: 'var(--font-mono)',
    fontSize: '1.1rem',
    fontWeight: '400',
    margin: 0,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  temperature: {
    color: 'var(--neon-green)',
    fontFamily: 'var(--font-mono)',
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: 0,
  },
  statusLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  statusIndicator: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--neon-green)',
    animation: 'pulse 1.5s infinite',
  },
  statusText: {
    color: 'var(--neon-green)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.6rem',
    opacity: 0.8,
    letterSpacing: '0.05em',
  },
  loadingText: {
    color: 'var(--neon-green)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    opacity: 0.7,
    animation: 'flicker 2s infinite',
    margin: 0,
  },
  errorText: {
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    margin: 0,
  }
};