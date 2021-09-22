import React, { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

// interfaces
import { Entry } from './../../interfaces/entry.interface';
import { Journal } from '../../interfaces/journal.interface';

// components
import { Header } from './../../components/Header/Header';
import { Input } from './../../components/Input/Input';
import { Button } from './../../components/Button/Button';
import { NavigationSection } from './../../components/NavigationSection/NavigationSection';

import { Api } from './../../Api';

interface CreateNoteResponse {
  journal: Journal;
  entry: Entry;
}

function CreateNotes(): JSX.Element {
  const params: { id: string } = useParams();
  const location = useLocation();
  const history = useHistory();
  const alert = useAlert();
  const [note, setNote] = useState<Entry>({
    title: '',
    content: '',
    journalId: params.id,
  });

  const journalTitle = location.search.split('=')[1];

  async function createNote() {
    if (params.id) {
      try {
        const response: CreateNoteResponse = await Api.createNote({ ...note });

        if (!response) {
          alert.error('There was an error');
        } else {
          alert.success('Note created successfully');
          history.push('/journals/' + note.journalId + '?name=' + journalTitle);
        }
      } catch (error) {
        alert.error("Journal doesn't exists");
        history.push('/journals/');
      }
    } else {
      alert.error('There was an error');
    }
  }

  function handleChangeTitle(noteTitle: string): void {
    if (noteTitle.length <= 40) {
      setNote({ ...note, title: noteTitle });
    }
  }

  function handleChangeContent(noteContent: string): void {
    if (noteContent.length <= 200) {
      setNote({ ...note, content: noteContent });
    }
  }

  return (
    <>
      <Header />
      <NavigationSection
        navigationPath={`/journals/${note.journalId}?name=${journalTitle}`}
        navigationPhrase={journalTitle}
        journalID={note.journalId}
      />
      <main className="journals-page">
        <Input
          inputDifferentColor="#ffffff6b"
          withoutFormik={true}
          fieldName="note-title"
          label="Title"
          value={note.title}
          hasError={note.title.length === 40}
          error="Character limit reached"
          handleChange={handleChangeTitle}
        />

        <Input
          inputDifferentColor="#ffffff6b"
          isTextArea={true}
          withoutFormik={true}
          fieldName="note-content"
          label="Write your note"
          value={note.content}
          hasError={note.content.length === 200}
          error="Character limit reached"
          handleChange={handleChangeContent}
        />

        <Button
          title="Save note"
          disabled={
            note.title.length < 3 ||
            note.title.length > 40 ||
            note.content.length < 3 ||
            note.content.length > 200
          }
          handleClick={createNote}
        />
      </main>
    </>
  );
}

export { CreateNotes };
