import React from 'react';

import { AuthProvider } from './context/AuthContext';
import Routes from './routes';

import './styles/main.scss';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export { App };
