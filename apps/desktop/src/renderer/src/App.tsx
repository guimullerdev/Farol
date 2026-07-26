import { useState } from 'react';
import './theme.css';
import LoginScreen from './screens/LoginScreen.js';
import AppShell from './screens/AppShell.js';

export default function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }
  return <AppShell />;
}
