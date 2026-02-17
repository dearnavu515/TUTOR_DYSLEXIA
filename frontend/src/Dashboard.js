import React from 'react';

function Dashboard({ onStartLesson, onStartFlashcards, onOpenSettings, onOpenCreateUser }) {
  // We use these styles to match your original screenshot perfectly
  const cardStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '30px',
    width: '280px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
  };

  const buttonStyle = {
    padding: '12px 25px',
    borderRadius: '25px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: 'white',
    marginTop: '20px',
    fontSize: '16px'
  };

  return (
    <div style={{ padding: '40px', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', margin: 0 }}>Hi, Michael! 👋</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontWeight: 'bold' }}>Level 3: Logic</span>
          <button onClick={onOpenSettings} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #ccc', background: 'white', cursor: 'pointer' }}>⚙️ Settings</button>
        </div>
      </div>

      {/* This container centers all the cards */}
      <div style={{ 
        display: 'flex', 
        gap: '30px', 
        justifyContent: 'center', 
        alignItems: 'stretch',
        marginTop: '20px' 
      }}>
        
        {/* English Skills */}
        <div style={cardStyle}>
          <div style={{ fontSize: '50px' }}>📖</div>
          <h2 style={{ fontSize: '28px', color: '#2D3436' }}>English Skills</h2>
          <button onClick={onStartLesson} style={{ ...buttonStyle, backgroundColor: '#FF7675' }}>Start Lesson</button>
        </div>

        {/* Math Skills */}
        <div style={cardStyle}>
          <div style={{ fontSize: '50px' }}>🔢</div>
          <h2 style={{ fontSize: '28px', color: '#2D3436' }}>Math Skills</h2>
          <button style={{ ...buttonStyle, backgroundColor: '#FAB1A0' }}>Start Practice</button>
        </div>

        {/* Flashcards */}
        <div style={cardStyle}>
          <div style={{ fontSize: '50px' }}>🗂️</div>
          <h2 style={{ fontSize: '28px', color: '#2D3436' }}>Flashcards</h2>
          <button onClick={onStartFlashcards} style={{ ...buttonStyle, backgroundColor: '#0984E3' }}>Practice</button>
        </div>

        {/* New User Profile Card - Styled exactly like the others */}
        <div style={cardStyle}>
          <div style={{ fontSize: '50px' }}>👤</div>
          <h2 style={{ fontSize: '28px', color: '#2D3436' }}>User Profile</h2>
          <button onClick={onOpenCreateUser} style={{ ...buttonStyle, backgroundColor: '#6C5CE7' }}>+ Create User</button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;