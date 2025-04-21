"use client";
import React from 'react';

const MusicPanelHeader = () => {
  return (
    <div style={styles.panelContainer}>
      {/* Header with red bar and text box */}
      <div style={styles.headerContainer}>
        <div style={styles.solidBar}></div>
        <div style={styles.textBox}>
          <span style={styles.chipText}>// MUSIC PLAYER</span>
        </div>
      </div>

      
      <div style={styles.playerRow}>
        <img 
          src="/images/music-comp/music-art.png" 
          alt="Music Art" 
          style={styles.albumArt}
        />
        <div style={styles.controlsPlaceholder}>
          [PLAYER CONTROLS WILL GO HERE]
        </div>
      </div>
    </div>
  );
};

const styles = {
  panelContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: 'transparent',
    gap: '1rem'
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '30px',
    background: 'transparent',
    gap: '4px',
    paddingLeft: '4px',
  },
  solidBar: {
    width: '8px',
    height: '100%',
    backgroundColor: 'var(--accent-red)',
    flexShrink: 0
  },
  textBox: {
    flex: 1,
    height: '100%',
    border: '2px solid var(--accent-red)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '12px',
    background: 'transparent'
  },
  chipText: {
    color: 'var(--accent-red)',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.05em',
    whiteSpace: 'nowrap'
  },
  playerRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem'
  },
  albumArt: {
    width: '200px',
    height: '200px',
    objectFit: 'cover'
  },
  controlsPlaceholder: {
    flex: 1,
    height: '185px',
    border: '1px dashed var(--accent-red)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--accent-red)',
    fontFamily: 'var(--font-mono)',
    opacity: 0.5,
    marginTop: '8px',
  }
};

export default MusicPanelHeader;  