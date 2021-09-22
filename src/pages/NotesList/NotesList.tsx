import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useAlert } from 'react-alert';

// intefaces
import { Entry } from './../../interfaces/entry.interface';

// components
import { Header } from './../../components/Header/Header';
import { EmptyJournals } from './../../components/EmptyJournals/EmptyJournals';
import { NavigationSection } from './../../components/NavigationSection/NavigationSection';
import { NoteCard } from './../../components/NoteCard/NoteCard';
import { Loading } from './../../components/Loading/Loading';

import { Api } from '../../Api';

import './NotesList.scss';

interface GetNotesResponse {
  entries: Entry[];
}

function NotesList(): JSX.Element {
  const location = useLocation();
  const params: { id: string } = useParams();
  const history = useHistory();
  const alert = useAlert();

  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<Entry[]>([]);
  const [journal] = useState({
    id: params.id,
    title: location.search.split('=')[1],
  });

  useEffect(() => {
    (async function () {
      if (journal.id) {
        try {
          const response: GetNotesResponse = await Api.getNotes(journal.id);

          setNotes(response.entries);
        } catch (error) {
          alert.error("Journal doesn't exists");
          history.push('/journals');
        }
      }

      setIsLoading(false);
    })();
  }, [alert, journal, history]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      {notes.length < 1 && (
        <NavigationSection
          navigationPhrase="return"
          navigationPath="/journals"
          journalID={journal.id}
        />
      )}
      <main
        className={`journals-page notes ${notes.length ? 'has-notes' : ''}`}
      >
        {notes.length < 1 ? (
          <EmptyJournals
            journalTitle={journal.title}
            navigationPhrase="Create a note"
            navigationPath={`/journals/${journal.id}/notes/create?name=${journal.title}`}
          />
        ) : (
          <div className="notes__listing">
            <NavigationSection
              withCreateNotes={true}
              navigationPhrase="return"
              navigationPath="/journals"
              journalID={journal.id}
              journalTitle={journal.title}
            />

            <div className="notes__listing__items">
              {notes.map((note: Entry) => {
                return (
                  <NoteCard
                    key={note.id}
                    id={note.id ? note.id : ''}
                    title={note.title}
                    content={note.content}
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export { NotesList };
