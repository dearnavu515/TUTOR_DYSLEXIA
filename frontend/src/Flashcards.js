import React, { useState } from 'react';

const Flashcards = ({ onBack }) => {
  const [index, setIndex] = useState(0);

  // Data pulled from your "Educational Content Datasets" [cite: 628, 629, 630]
  const flashcardData = [
    { word: "Apple", emoji: "🍎", phonetic: "ap-puhl" }, // [cite: 648]
    { word: "Cat", emoji: "🐱", phonetic: "kat" },
    { word: "Sun", emoji: "☀️", phonetic: "suhn" },
    { word: "Tree", emoji: "🌳", phonetic: "tree" }
  ];

  // Multisensory Feature: Text-to-Speech [cite: 372, 399, 457]
  const playSound = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const nextCard = () => {
    if (index < flashcardData.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0); // Loops back to the start [cite: 680]
    }
  };

  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const current = flashcardData[index];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Navigation Header */}
      <button onClick={onBack} style={styles.navBtn}>← Back to Dashboard</button>
      
      <div style={styles.flashcardBox}>
        <p style={{ color: '#666', fontSize: '1rem' }}>Card {index + 1} of {flashcardData.length}</p>
        
        {/* Visual Reinforcement [cite: 633] */}
        <div style={{ fontSize: '8rem', margin: '20px 0' }}>{current.emoji}</div>
        
        {/* Word Label and Phonetic Mapping [cite: 648] */}
        <h2 style={{ fontSize: '3.5rem', margin: '0' }}>{current.word}</h2>
        <p style={{ fontSize: '1.2rem', color: '#6c5ce7', fontWeight: 'bold' }}>[{current.phonetic}]</p>

        {/* TTS Control [cite: 399, 457] */}
        <button 
          onClick={() => playSound(current.word)} 
          style={{ ...styles.actionBtn, backgroundColor: '#00b894', marginTop: '20px' }}
        >
          🔊 Listen
        </button>

        {/* Card Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          <button onClick={prevCard} style={styles.navBtn}>Previous</button>
          <button onClick={nextCard} style={{ ...styles.navBtn, backgroundColor: '#0984e3', color: 'white', border: 'none' }}>Next Card</button>
        </div>
      </div>
    </div>
  );
};

// --- STYLES: Grouped into an object to resolve "no-undef" errors ---
const styles = {
  flashcardBox: {
    background: 'white',
    padding: '50px',
    borderRadius: '30px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    margin: '20px auto'
  },
  actionBtn: {
    padding: '12px 25px',
    borderRadius: '25px',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1.1rem'
  },
  navBtn: {
    padding: '10px 20px',
    borderRadius: '15px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    background: '#fff',
    fontWeight: 'bold'
  }
};

export default Flashcards;