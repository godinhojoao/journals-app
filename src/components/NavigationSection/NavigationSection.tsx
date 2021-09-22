import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ReactComponent as ChevronLeftIcon } from './../../assets/journal-list/chevron-left.svg';

// components
import { Button } from './../Button/Button';

import './NavigationSection.scss';

interface NavigationSectionProps {
  navigationPhrase: string;
  navigationPath: string;
  withCreateNotes?: boolean;
  journalID?: string;
  journalTitle?: string;
}

function NavigationSection(props: NavigationSectionProps): JSX.Element {
  const history = useHistory();
  const {
    withCreateNotes,
    navigationPhrase,
    journalID,
    navigationPath,
    journalTitle,
  } = props;

  return (
    <nav className="navigation-section">
      <Link to={navigationPath}>
        <div className="navigation-section__page-actions">
          <ChevronLeftIcon />
          <h3 className="navigation-section__page-actions__title">
            {navigationPhrase}
          </h3>
        </div>
      </Link>
      {withCreateNotes && journalID && (
        <Button
          title="Add note"
          disabled={false}
          outlinedButton={true}
          handleClick={() => {
            if (withCreateNotes && journalID) {
              history.push(
                `/journals/${journalID}/notes/create?name=${journalTitle}`
              );
            }
          }}
        />
      )}
    </nav>
  );
}

export { NavigationSection };
