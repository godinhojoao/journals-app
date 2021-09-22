import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

// interfaces
import { SignPageInterface } from './../../interfaces/signPage.interface';
import { SignParamsInterface } from './../../interfaces/signParams.interface';

// components
import { DefaultSignPage } from './../../components/DefaultSignPage/DefaultSignPage';

import { AuthContext } from './../../context/AuthContext';
import loginSchema from './loginSchema';

function Login(): JSX.Element {
  const alert = useAlert();
  const history = useHistory();
  const { isAuthenticated, handleLogin } = useContext(AuthContext);

  async function tryToLogin(userValues: SignParamsInterface) {
    await handleLogin(userValues, alert);
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/journals');
    }
  }, [isAuthenticated, history]);

  const signPage: SignPageInterface = {
    title: 'Sign in',
    navigationPhrase: 'Sign up',
    navigationLink: '/register',
    fields: ['username', 'password'],
    initialValues: {
      username: '',
      password: '',
    },
    placeholders: {
      username: 'Your username',
      password: 'Your password',
    },
    buttonTitle: 'Log In',
    pageType: 'login',
    handleSubmit: tryToLogin,
    validationSchema: loginSchema,
  };

  return <DefaultSignPage signPage={signPage} />;
}

export { Login };
