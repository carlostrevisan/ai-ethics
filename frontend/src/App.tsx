import React, { useState, useEffect } from 'react';
import { ChatPage } from './pages/ChatPage';
import { PasswordProtection } from './components/PasswordProtection';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated in this session
    const authenticated = sessionStorage.getItem('authenticated') === 'true';
    setIsAuthenticated(authenticated);
  }, []);

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <ChatPage />;
}

export default App;
