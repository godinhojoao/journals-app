import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

// interfaces
import { SignPageInterface } from './../../interfaces/signPage.interface';
import { SignParamsInterface } from './../../interfaces/signParams.interface';

// components
import { DefaultSignPage } from './../../components/DefaultSignPage/DefaultSignPage';

import { Api } from './../../Api';
import registerSchema from './registerSchema';

function Register(): JSX.Element {
  const alert = useAlert();
  const history = useHistory();

  async function handleRegister(
    userValues: SignParamsInterface
  ): Promise<void> {
    try {
      const user = await Api.registerUser(userValues);

      if (!user) {
        alert.error('There was an error');
      } else {
        alert.success('Registered successfully');
        history.push('/login');
      }
    } catch (error) {
      alert.error('There was an error');
    }
  }

  const signPage: SignPageInterface = {
    title: 'Sign Up',
    navigationPhrase: 'Already have an account',
    navigationLink: '/login',
    fields: ['username', 'password', 'email'],
    initialValues: {
      username: '',
      password: '',
      email: '',
    },
    placeholders: {
      username: 'Define a username',
      password: 'Set your password',
      email: 'Email (optional)',
    },
    buttonTitle: 'Create account',
    pageType: 'register',
    handleSubmit: handleRegister,
    validationSchema: registerSchema,
  };

  return <DefaultSignPage signPage={signPage} />;
}

export { Register };
