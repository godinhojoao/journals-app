import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';

// interfaces
import { SignPageInterface } from './../../interfaces/signPage.interface';

// components
import { ReactComponent as LogoIcon } from './../../assets/logo.svg';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

import './DefaultSignPage.scss';

interface DefaultSignPageProps {
  signPage: SignPageInterface;
}

function DefaultSignPage(props: DefaultSignPageProps): JSX.Element {
  const { signPage } = props;

  return (
    <div className="sign-page">
      <h1 className="sign-page__logo">
        <LogoIcon />
      </h1>

      <div className="sign-page__input-header">
        <h3 className="sign-page__input-header__title">{signPage.title}</h3>
        <span className="link-style">
          <Link to={signPage.navigationLink}>{signPage.navigationPhrase}</Link>
        </span>
      </div>

      <Formik
        initialValues={signPage.initialValues}
        validationSchema={signPage.validationSchema}
        onSubmit={async (values) => {
          await signPage.handleSubmit(values);
        }}
      >
        {({ errors, touched, isValid, values }) => {
          return (
            <Form className="sign-page__login-container">
              {signPage.fields &&
                signPage.fields.map((field, index): JSX.Element => {
                  return (
                    <Input
                      key={index}
                      fieldName={field.toString()}
                      label={signPage.placeholders[field.toString()]}
                      value={values[field.toString()]}
                      isPassword={field === 'password'}
                      hasError={
                        !!(
                          touched[field.toString()] && errors[field.toString()]
                        )
                      }
                      error={errors[field.toString()]}
                    />
                  );
                })}
              {signPage.pageType === 'login' && (
                <span className="link-style forgot-password">
                  {/* it does nothing, yet. hehe :P*/}
                  Forgot password?
                </span>
              )}
              <Button title={signPage.buttonTitle} disabled={!isValid} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export { DefaultSignPage };
