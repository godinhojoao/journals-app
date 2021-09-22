import React from 'react';
import { Field } from 'formik';

import './Input.scss';

interface InputProps {
  fieldName: string;
  label: string;
  isPassword?: boolean;
  value: string;
  hasError?: boolean;
  error?: string;
  withoutFormik?: boolean;
  handleChange?: Function;
  isTextArea?: boolean;
  differentClassName?: string;
  inputDifferentColor?: string;
}

function Input(props: InputProps): JSX.Element {
  const {
    fieldName,
    label,
    isPassword = false,
    value,
    hasError,
    error,
    withoutFormik,
    handleChange,
    isTextArea,
    differentClassName,
    inputDifferentColor,
  } = props;

  return (
    <div
      className={`input-container ${isPassword ? '__password-container' : ''} ${
        withoutFormik ? 'without-formik' : ''
      }`}
    >
      {withoutFormik ? (
        <>
          {isTextArea ? (
            <textarea
              className={`input ${
                value.length ? 'has-content' : ''
              } text-area ${differentClassName ? differentClassName : ''}`}
              style={{ backgroundColor: inputDifferentColor }}
              id={fieldName}
              name={fieldName}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                if (handleChange) {
                  handleChange(e.target.value);
                }
              }}
            />
          ) : (
            <input
              className={`input ${value.length ? 'has-content' : ''}`}
              style={{ backgroundColor: inputDifferentColor }}
              id={fieldName}
              name={fieldName}
              value={value}
              autoComplete="off"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                if (handleChange) {
                  handleChange(e.target.value);
                }
              }}
            />
          )}
        </>
      ) : (
        <Field
          className={`input ${value.length ? 'has-content' : ''}`}
          id={fieldName}
          name={fieldName}
          type={isPassword ? 'password' : 'text'}
          value={value}
          autoComplete="off"
        />
      )}
      <label>{label}</label>
      {hasError && error && (
        <span className="input-container__error">{error}</span>
      )}
    </div>
  );
}

export { Input };
