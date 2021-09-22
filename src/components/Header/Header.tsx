import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { AuthContext } from './../../context/AuthContext';

//components
import { ReactComponent as LogoIcon } from './../../assets/logo.svg';
import { Button } from './../Button/Button';

import './Header.scss';

interface HeaderProps {
  hasJournals?: boolean;
}

function Header(props: HeaderProps): JSX.Element {
  const { handleLogout } = useContext(AuthContext);
  const history = useHistory();
  const alert = useAlert();
  const { hasJournals } = props;

  return (
    <header className="main-header">
      <h1 className="main-header__logo">
        <LogoIcon />
      </h1>
      {hasJournals ? (
        <div className="main-header__buttons-container">
          <Button
            title="Add Journal"
            disabled={false}
            outlinedButton={true}
            handleClick={() => {
              if (hasJournals) {
                history.push('/journals/create');
              }
            }}
          />
          <Button
            customStyle={{ marginLeft: '10px', width: '50px' }}
            title="Exit"
            disabled={false}
            handleClick={() => {
              handleLogout(alert);
            }}
          />
        </div>
      ) : (
        <Button
          customStyle={{ marginLeft: '10px', width: '50px' }}
          title="Exit"
          disabled={false}
          handleClick={() => {
            handleLogout(alert);
          }}
        />
      )}
    </header>
  );
}

export { Header };
