import React, { useState } from 'react';

function CreateUser({ onCreate, onBack }) {
  const [formData, setFormData] = useState({ username: '', id: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.id) {
      alert("Please fill in both fields");
      return;
    }
    onCreate(formData);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Create New Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
        <input 
          type="text"
          placeholder="Enter Username" 
          style={{ padding: '10px', fontSize: '18px' }}
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        />
        <input 
          type="text"
          placeholder="Enter Unique ID" 
          style={{ padding: '10px', fontSize: '18px' }}
          onChange={(e) => setFormData({...formData, id: e.target.value})} 
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#e17055', color: 'white', border: 'none', cursor: 'pointer' }}>
          Register User
        </button>
      </form>
      <button onClick={onBack} style={{ marginTop: '20px', background: 'none', border: '1px solid #ccc', cursor: 'pointer' }}>
        Go Back
      </button>
    </div>
  );
}

export default CreateUser;