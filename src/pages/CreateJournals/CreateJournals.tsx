import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

// interfaces
import { Journal } from '../../interfaces/journal.interface';
import { User } from '../../interfaces/user.interface';

// components
import { Button } from './../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Header } from './../../components/Header/Header';
import { JournalCard } from './../../components/JournalCard/JournalCard';
import { NavigationSection } from './../../components/NavigationSection/NavigationSection';

import { Api } from './../../Api';

interface CreatedJournalResponse {
  user: User;
  journal: Journal;
}

function CreateJournals(): JSX.Element {
  const history = useHistory();
  const alert = useAlert();
  const [journal, setJournal] = useState<Journal>({
    title: '',
    type: 'public',
    userId: '',
    entryIds: [],
  });

  async function createJournal() {
    const userFromStore = localStorage.getItem('user');

    if (userFromStore) {
      const user: User = JSON.parse(userFromStore);

      try {
        const response: CreatedJournalResponse = await Api.createJournal({
          ...journal,
          userId: user.id,
        });

        if (!response) {
          alert.error('There was an error');
        } else {
          const { user } = response;

          localStorage.setItem('user', JSON.stringify(user));

          alert.success('Journal created successfully');
          history.push('/journals');
        }
      } catch (error) {
        alert.error('There was an error');
      }
    } else {
      alert.error('There was an error');
    }
  }

  function handleChangeJournal(journalTitle: string): void {
    if (journalTitle.length <= 40) {
      setJournal({ ...journal, title: journalTitle });
    }
  }

  return (
    <>
      <Header />
      <NavigationSection navigationPath="/journals" navigationPhrase="return" />
      <main className="journals-page">
        <JournalCard isCreateCard={true} title={journal.title} />
        <Input
          withoutFormik={true}
          value={journal.title}
          inputDifferentColor="#ffffff6b"
          fieldName="journal"
          label="Journal title"
          hasError={journal.title.length >= 40}
          error="Character limit reached"
          handleChange={handleChangeJournal}
        />

        <Button
          title="Save journal"
          disabled={journal.title.length < 1 || journal.title.length > 40}
          handleClick={createJournal}
        />
      </main>
    </>
  );
}

export { CreateJournals };
