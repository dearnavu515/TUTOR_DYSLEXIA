import React, { useState } from 'react';

// STYLES: Large touch targets and clear progress [cite: 80, 187, 207-212]
const styles = {
  card: { background: 'white', borderRadius: '20px', padding: '30px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', maxWidth: '600px', margin: 'auto' },
  optionBtn: { width: '100%', padding: '15px', margin: '10px 0', borderRadius: '15px', border: '2px solid #dfe6e9', backgroundColor: '#fff', fontSize: '1.2rem', cursor: 'pointer' },
  progressBar: { width: '100%', height: '10px', background: '#eee', borderRadius: '5px', marginBottom: '20px', overflow: 'hidden' },
  hintBtn: { background: 'transparent', border: 'none', color: '#6c5ce7', textDecoration: 'underline', cursor: 'pointer', marginTop: '15px' }
};

const Quiz = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('Medium'); // Starts at Medium [cite: 288]

  // Mock Question Bank 
  const questions = [
    { text: "How many sides does a square have?", options: ["3", "4", "5", "6"], correct: "4" },
    { text: "What is the meaning of 'devastated'?", options: ["Happy", "Small", "Destroyed", "Fast"], correct: "Destroyed" }
  ];

  const handleAnswer = (selected) => {
    const isCorrect = selected === questions[currentStep].correct;
    
    // Update score [cite: 137]
    if (isCorrect) setScore(prev => prev + 1);

    // ADAPTIVE LOGIC: Adjust Level [cite: 139-140]
    if (isCorrect && difficulty !== 'Hard') {
      setDifficulty('Hard');
    } else if (!isCorrect && difficulty !== 'Easy') {
      setDifficulty('Easy');
    }

    // Move to next question or finish [cite: 141]
    if (currentStep + 1 < questions.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      onFinish(score + (isCorrect ? 1 : 0));
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <div style={{ padding: '20px' }}>
      <div style={styles.card}>
        {/* Progress & Difficulty [cite: 187, 314] */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>Level: {difficulty}</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ width: `${((currentStep + 1) / questions.length) * 100}%`, height: '100%', background: '#00b894' }}></div>
        </div>

        {/* Question Display [cite: 134, 196] */}
        <h2 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>{currentQuestion.text}</h2>

        {/* Answer Options [cite: 135, 207-212] */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {currentQuestion.options.map((opt, i) => (
            <button key={i} style={styles.optionBtn} onClick={() => handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>

        <button style={styles.hintBtn}>Need a Hint?</button>
      </div>
    </div>
  );
};

export default Quiz;