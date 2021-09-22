import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as MeditatingIcon } from './../../assets/journal-list/meditating.svg';

interface EmptyJournalsProps {
  navigationPhrase: string;
  navigationPath: string;
  journalTitle?: string;
}

function EmptyJournals(props: EmptyJournalsProps): JSX.Element {
  const { navigationPath, navigationPhrase, journalTitle } = props;

  const journalTitleStyle = {
    color: 'black',
    fontFamily: 'Abhaya Libre, sans-serif',
    fontSize: '24px',
    marginBottom: '28px',
  };

  return (
    <>
      {journalTitle && <h3 style={journalTitleStyle} className="avoid-phrase-overflow">{journalTitle}</h3>}
      <MeditatingIcon />
      <Link to={navigationPath} className="link-style">
        {navigationPhrase}
      </Link>
    </>
  );
}

export { EmptyJournals };
