import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Lesson from './Lesson';
import Quiz from './Quiz';
import Flashcards from './Flashcards';
import CreateUser from './CreateUser';
import Accessibility from './Accessibility';

function App() {
  // Navigation State
  const [view, setView] = useState('dashboard');
  
  // "Database" States
  const [users, setUsers] = useState({}); // Local cache of user profiles
  const [, setInteractionLogs] = useState([]); // Stores logs

  // Accessibility/Theme State
  const [settings, setSettings] = useState({
    fontSize: '24px',
    theme: 'cream',
    contrast: false
  });

  // 1. User Creation Logic (CONNECTED TO PYTHON BACKEND)
  const handleCreateUser = async (userData) => {
    try {
      // We send the data to your Flask server running on port 5000
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success: " + data.message);
        // Update local React state so the UI stays in sync
        setUsers(prev => ({ ...prev, [userData.id]: { username: userData.username } }));
        setView('dashboard');
        return true;
      } else {
        // This handles "ID already exists" or other backend errors
        alert("Error: " + (data.error || data.message));
        return false;
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the Python backend. Make sure your Flask server is running!");
      return false;
    }
  };

  // 2. Interaction Logging Logic
  const handleLogInteraction = (data) => {
    const logEntry = {
      user_id: data.user_id || "User_01",
      content_id: data.content_id || "lesson_01",
      metrics: {
        cursor_dwell_time: data.dwellTime || 0,
        click_latency: data.clickLatency || 0,
        saccade_pattern: data.saccades || []
      },
      timestamp: new Date().toISOString()
    };
    setInteractionLogs(prev => [...prev, logEntry]);
    console.log("New Log Recorded:", logEntry);
  };

  const globalStyle = {
    fontSize: settings.fontSize,
    backgroundColor: settings.contrast ? '#000' : (settings.theme === 'cream' ? '#FFF9E3' : '#fff'),
    color: settings.contrast ? '#FFFF00' : '#2D3436',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={globalStyle}>
      {view === 'dashboard' && (
        <Dashboard 
  onStartLesson={() => setView('lesson')} 
  onStartFlashcards={() => setView('flashcards')} 
  onOpenSettings={() => setView('settings')}
  onOpenCreateUser={() => setView('createUser')} 
  registeredUsers={users} // Pass the users here
/>
      )}

      {view === 'createUser' && (
        <CreateUser onCreate={handleCreateUser} onBack={() => setView('dashboard')} />
      )}

      {view === 'settings' && (
        <Accessibility settings={settings} setSettings={setSettings} onDone={() => setView('dashboard')} />
      )}

      {view === 'lesson' && (
        <Lesson 
          onBack={() => setView('dashboard')} 
          onNext={() => setView('quiz')} 
          logInteraction={handleLogInteraction} 
        />
      )}

      {view === 'quiz' && (
        <Quiz 
          onFinish={() => setView('dashboard')} 
          logInteraction={handleLogInteraction}
        />
      )}

      {view === 'flashcards' && (
        <Flashcards onBack={() => setView('dashboard')} />
      )}
    </div>
  );
}

export default App;