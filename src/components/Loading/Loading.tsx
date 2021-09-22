import React from 'react';

import { ReactComponent as LoadingIcon } from './../../assets/loading.svg';

function Loading(): JSX.Element {
  const centerContainerStyle = {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  };

  return (
    <div style={centerContainerStyle}>
      <LoadingIcon />
    </div>
  );
}

export { Loading };
