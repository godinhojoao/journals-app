import React from 'react';
import { useHistory } from 'react-router-dom';

import './JournalCard.scss';

interface JournalCardProps {
  title: string;
  isOdd?: boolean;
  journalNavigationPath?: string;
  isCreateCard?: boolean;
}

function JournalCard(props: JournalCardProps): JSX.Element {
  const history = useHistory();
  const { title, isOdd, journalNavigationPath, isCreateCard } = props;

  return (
    <div
      className={`journal-limit ${isCreateCard ? 'create-card' : ''} ${!journalNavigationPath ? 'default-cursor' : ''}`}
      onClick={() => {
        if (journalNavigationPath) {
          history.push(journalNavigationPath);
        }
      }}
    >
      <div className="journal-limit__left-side"></div>
      <div className={`journal-limit__content-side ${isOdd ? 'even' : 'odd'}`}>
        <h3 className="journal-limit__content-side__title">{title}</h3>
      </div>
    </div>
  );
}

export { JournalCard };
