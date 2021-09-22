import React, { createContext, ReactNode } from 'react';

// interfaces
import { AuthContextProps } from './../interfaces/authContext.interface';

import { useAuth } from './hooks/useAuth';

const DEFAULT_VALUE = {
  isAuthenticated: false,
  handleLogin: (): void => {},
  handleLogout: (): void => {},
};

const AuthContext = createContext<AuthContextProps>(DEFAULT_VALUE);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider(props: AuthProviderProps): JSX.Element {
  const { children } = props;
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
