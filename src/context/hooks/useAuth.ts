import { useState, useEffect } from "react";
import { AlertManager } from "react-alert";

// interfaces
import { SignParamsInterface } from './../../interfaces/signParams.interface';
import { AuthContextProps } from "./../../interfaces/authContext.interface";

import { Api } from "./../../Api";

export function useAuth(): AuthContextProps {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const tokenFromStore = localStorage.getItem('token');
    const userFromStore = localStorage.getItem('user');

    if (!tokenFromStore || !userFromStore) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } else {
      const user = JSON.parse(userFromStore);

      (async function () {
        try {
          await Api.login(user);

          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
        }
      })();
    }

  }, []);

  async function handleLogin(userValues: SignParamsInterface, alert: AlertManager): Promise<void> {

    try {
      const { user, token } = await Api.login(userValues);
      setIsAuthenticated(true);

      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));

      alert.success('Successfully logged in.');
    } catch (error) {
      alert.error('Some data is incorrect');
    }
  }

  function handleLogout(alert: AlertManager): void {
    setIsAuthenticated(false);

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    alert.success('Successfully logged out');
  }

  return { isAuthenticated, handleLogin, handleLogout };
}