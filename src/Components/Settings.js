import React, { useEffect, useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [password, setPassword] = useState('');
  const [emailServer, setEmailServer] = useState('');
  const [notificationFrequency, setNotificationFrequency] = useState('daily');

  useEffect(() => {
    fetch('/api/settings')
      .then(response => response.json())
      .then(data => {
        setPassword(data.password);
        setEmailServer(data.emailServer);
        setNotificationFrequency(data.notificationFrequency);
      });
  }, []);

  const handleSaveSettings = () => {
    const settings = {
      password,
      emailServer,
      notificationFrequency
    };

    fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    })
    .then(response => response.json())
    .then(data => {
      // Handle response data
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Settings</h1>
      </header>
      <section className="section">
        <h2>Account Management</h2>
        <div className="settings-item">
          <label>Change Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
      </section>
      <section className="section">
        <h2>System Configuration</h2>
        <div className="settings-item">
          <label>Email Server:</label>
          <input 
            type="text" 
            value={emailServer} 
            onChange={(e) => setEmailServer(e.target.value)} 
          />
        </div>
      </section>
      <section className="section">
        <h2>Notification Settings</h2>
        <div className="settings-item">
          <label>Frequency:</label>
          <select 
            value={notificationFrequency} 
            onChange={(e) => setNotificationFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </section>
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
};

export default Settings;