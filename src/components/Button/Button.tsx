import React, { CSSProperties } from 'react';

import { ReactComponent as PlusIcon } from './../../assets/journal-list/plus.svg';

import './Button.scss';

interface ButtonProps {
  title: string;
  disabled: boolean;
  outlinedButton?: boolean;
  handleClick?: Function;
  customStyle?: CSSProperties;
}

function Button(props: ButtonProps): JSX.Element {
  const { title, disabled, outlinedButton, handleClick, customStyle } = props;

  return (
    <button
      style={customStyle}
      className={`
        ${disabled ? 'disabled' : ''}
        ${outlinedButton ? 'outlined-button' : ''}
      `}
      type="submit"
      disabled={disabled}
      onClick={() => {
        if (handleClick) {
          handleClick();
        }
      }}
    >
      {outlinedButton && <PlusIcon />} {title}
    </button>
  );
}

export { Button };
