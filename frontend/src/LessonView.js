import React, { useState } from 'react';

const LessonView = ({ title, content, imageUrl }) => {
  const [isReading, setIsReading] = useState(false);

  // Text-to-Speech Function (Multisensory Support)
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="lesson-card" style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>{title}</h1>
      
      {/* Visual Aid */}
      {imageUrl && <img src={imageUrl} alt="Lesson Visual" style={{ width: '100%', borderRadius: '10px' }} />}
      
      {/* Dyslexia-Friendly Text Block */}
      <div className="lesson-text" style={{ margin: '20px 0', lineHeight: '1.8' }}>
        <p>{content}</p>
      </div>

      {/* Audio Support Button */}
      <button 
        onClick={() => speak(content)} 
        disabled={isReading}
        style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}
      >
        {isReading ? "Reading..." : "🔊 Read Lesson Aloud"}
      </button>
    </div>
  );
};

export default LessonView;