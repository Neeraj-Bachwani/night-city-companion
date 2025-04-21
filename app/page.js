"use client";
import WeatherPanel from "@/components/WeatherPanel";
import TimePanel from "@/components/TimePanel";
import EventPanel from "@/components/EventPanel";
import MusicPanel from "@/components/MusicPanel";

export default function Home() {
  return (
    <div style={styles.mainContainer}>
     
      <div style={styles.backgroundElements}>
        <div style={styles.gridOverlay}></div>
        <div style={styles.borderOverlay}></div>
      </div>

     
      <div style={styles.contentContainer}>
        <header style={styles.header}>
          <h1 style={styles.title}>NIGHTCITY COMPANION</h1>
          <p style={styles.status}>
            <span style={styles.statusSymbol}>//</span> SYSTEM STATUS:{" "}
            <span style={styles.onlineStatus}>ONLINE</span>
          </p>
        </header>

        <div style={styles.dashboard}>
          <div style={styles.topRow}>
            <WeatherPanel />
            <TimePanel />
          </div>

          <div style={styles.mainContent}>
            
            <EventPanel />
            <div style={styles.panelSpacing}>

            <MusicPanel />
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "var(--dark-primary)",
    overflow: "hidden",
  },
  backgroundElements: {
    position: "fixed",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(to right, var(--dark-secondary) 1px, transparent 1px),
      linear-gradient(to bottom, var(--dark-secondary) 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px",
    opacity: 0.15,
  },
  borderOverlay: {
    position: "absolute",
    inset: 0,
    border: "1px solid var(--dark-secondary)",
    opacity: 0.5,
    margin: "0.5rem",
  },
  contentContainer: {
    position: "relative",
    zIndex: 1,
    padding: "1.5rem",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    marginBottom: "1.5rem",
    borderBottom: "1px solid var(--accent-red)",
    paddingBottom: "0.5rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "var(--accent-red)",
    marginBottom: "0.25rem",
    fontFamily: "var(--font-mono)",
    letterSpacing: "0.05em",
    textShadow: "0 0 5px var(--accent-red)",
    margin: 0,
  },
  status: {
    color: "var(--neon-green)",
    fontSize: "0.875rem",
    fontFamily: "var(--font-mono)",
    fontWeight: "800",
    textShadow: "0 0 3px var(--neon-green)",
    margin: 0,
  },
  statusSymbol: {
    color: "var(--neon-green)",
  },
  onlineStatus: {
    color: "var(--neon-green)",
    animation: "flicker 5s infinite alternate",
  },
  dashboard: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    flex: 1,
  },
  topRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  mainContent: {
    flex: 1,
  },
  panelSpacing: {
    marginTop: "2rem",
  },
  
};