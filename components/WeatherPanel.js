"use client";

import {useState, useEffect} from 'react';

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
  
    if (loading) return <p>Loading weather data...</p>;
    if (locationError) return <p>{locationError}</p>;
    if (!weather || !weather.weather || !weather.weather[0]) return <p>Weather data unavailable.</p>;
  
    const cyberName = mapWeatherToCyberpunk(weather.weather[0].main);
    const temp = Math.round(weather.main.temp);
  
    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">//CURRENT CONDITIONS</h2>
        <p className="text-xl">{cyberName} {temp}°C</p>
      </div>
    );
  }
  
  function mapWeatherToCyberpunk(condition) {
    switch (condition.toLowerCase()) {
      case "clear": return "NEON GLARE";
      case "clouds": return "CORPO SMOG";
      case "rain": return "CHROME WASH";
      case "drizzle": return "NETRUNNER'S TEARS";
      case "thunderstorm": return "ARASAKA BLACKOUT";
      case "snow": return "ICE-9 FALLOUT";
      case "mist": return "SOULKILLER MIST"
      case "fog": return "CYBERPSYCHO SHROUD";
      case "haze":  return "DATA STORM";
      default: return condition;
    }
}
