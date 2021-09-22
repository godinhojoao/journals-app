import React, { useEffect, useState } from 'react';

// interfaces
import { Journal } from '../../interfaces/journal.interface';
import { User } from '../../interfaces/user.interface';

// components
import { Header } from '../../components/Header/Header';
import { EmptyJournals } from './../../components/EmptyJournals/EmptyJournals';
import { JournalCard } from './../../components/JournalCard/JournalCard';
import { Loading } from './../../components/Loading/Loading';

import { Api } from './../../Api';

import './JournalsList.scss';

interface GetJournalsResponse {
  journals: Journal[];
}

function JournalsList(): JSX.Element {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userFromStore = localStorage.getItem('user');

    (async function () {
      if (userFromStore) {
        const user: User = JSON.parse(userFromStore);

        if (user.id) {
          const journalsFromUser: GetJournalsResponse = await Api.getJournals(
            user.id
          );

          if (journalsFromUser.journals) {
            setJournals(journalsFromUser.journals);
          }
        }
      }

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header hasJournals={!!journals.length} />
      <main
        className={`journals-page list-page ${
          journals.length > 1 ? 'has-journals' : ''
        }`}
      >
        {journals.length < 1 ? (
          <EmptyJournals
            navigationPhrase="Create a journal"
            navigationPath="/journals/create"
          />
        ) : (
          journals.map((journal: Journal, index: number): JSX.Element => {
            return (
              <JournalCard
                key={journal.id}
                journalNavigationPath={`/journals/${journal.id}?name=${journal.title}`}
                isOdd={index % 2 === 0 ? true : false}
                title={journal.title}
              />
            );
          })
        )}
      </main>
    </>
  );
}

export { JournalsList };
