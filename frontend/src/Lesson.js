import React, { useState, useEffect, useRef } from 'react';

const Lesson = ({ onBack, onNext, logInteraction }) => {
  const [startTime] = useState(Date.now());
  const [isReading, setIsReading] = useState(false);
  const lessonRef = useRef(null);

  // 1. TEXT-TO-SPEECH (Multisensory Support)
  const speak = (text) => {
    window.speechSynthesis.cancel(); // Stop any current speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slower pace for dyslexia support
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => {
      setIsReading(false);
      // LOGGING: User used audio support (Sign of engagement or struggle)
      logInteraction({ user_id: "User_01", type: "audio_play", content_id: "lesson_1" });
    };
    window.speechSynthesis.speak(utterance);
  };

  // 2. INTERACTION TRACKING (For your ML Model)
  const handleNext = () => {
    const timeSpent = (Date.now() - startTime) / 1000;
    // Sending metrics: Time spent is key for "Struggle" classification
    logInteraction({
      user_id: "User_01",
      dwellTime: timeSpent,
      content_id: "lesson_1"
    });
    onNext();
  };

  const lessonContent = "Dyslexia is a learning difficulty that affects the way people read and spell words. It has nothing to do with intelligence. Many creative people have dyslexia!";

  return (
    <div className="lesson-container" style={{ padding: '40px', textAlign: 'left' }}>
      <button onClick={onBack}>⬅ Back to Dashboard</button>
      
      <h2 style={{ marginTop: '20px' }}>What is Dyslexia?</h2>
      
      {/* Visual Aid placeholder */}
      <div style={{ background: '#ddd', height: '200px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <p>[Educational Image/Animation Here]</p>
      </div>

      <p style={{ lineHeight: '1.6', fontSize: '1.2em' }}>{lessonContent}</p>

      <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => speak(lessonContent)}
          style={{ padding: '15px', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '8px' }}
        >
          {isReading ? "🔈 Reading Aloud..." : "🔊 Read to Me"}
        </button>

        <button 
          onClick={handleNext}
          style={{ padding: '15px', backgroundColor: '#55efc4', border: 'none', borderRadius: '8px' }}
        >
          Continue to Quiz ➡
        </button>
      </div>
    </div>
  );
};

export default Lesson;