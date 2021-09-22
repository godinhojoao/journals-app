import React, { useState } from 'react';
import { useAlert } from 'react-alert';

// components
import { ReactComponent as CloseIcon } from './../../assets/close.svg';
import { Input } from './../Input/Input';
import { Button } from './../Button/Button';

import { Api } from './../../Api';

import './ExpandedCard.scss';

interface expandedCardProps {
  id: string;
  title: string;
  content: string;
  toggleView: Function;
  setCardTitle: Function;
}

function ExpandedCard(props: expandedCardProps): JSX.Element {
  const alert = useAlert();
  const { id, title, content, toggleView, setCardTitle } = props;
  const [currentContent, setCurrentContent] = useState<string>(content);
  const [currentTitle, setCurrentTitle] = useState<string>(title);

  function handleChangeTitle(newTitle: string): void {
    if (newTitle.length <= 40) {
      setCurrentTitle(newTitle);
    }
  }

  function handleChangeContent(newContent: string): void {
    if (newContent.length <= 200) {
      setCurrentContent(newContent);
    }
  }

  async function updateEntry(): Promise<void> {
    const updatedNote = { id, title: currentTitle, content: currentContent };

    try {
      await Api.updateNote(updatedNote);

      setCardTitle(updatedNote.title);

      const elementWhoClosesContainer = document.querySelector(
        '.expanded-card__container__alert-container'
      ) as HTMLElement;

      if (elementWhoClosesContainer) {
        elementWhoClosesContainer.click();
      }

      alert.success('Note updated successfully');
    } catch (error) {
      console.log(error);
      alert.error('There was an error');
    }
  }

  return (
    <div className="expanded-card">
      <div className="expanded-card__container">
        <div
          className="expanded-card__container__alert-container"
          onClick={() => {
            toggleView(false);
          }}
        >
          <CloseIcon />
          <span>Click here to exit</span>
        </div>
        <h3 className="expanded-card__container__subtitle">Title</h3>
        <Input
          withoutFormik={true}
          fieldName="note-title"
          differentClassName="expanded-card__container__header"
          label="Title"
          value={currentTitle}
          hasError={currentTitle.length === 40}
          error="Character limit reached"
          handleChange={handleChangeTitle}
        />
        <h3 className="expanded-card__container__subtitle">Content</h3>
        <Input
          isTextArea={true}
          withoutFormik={true}
          fieldName="note-content"
          differentClassName="expanded-card__container__content"
          label="Content"
          value={currentContent}
          hasError={currentContent.length === 200}
          error="Character limit reached"
          handleChange={handleChangeContent}
        />

        <Button
          title="Save note"
          disabled={
            currentTitle.length < 3 ||
            currentTitle.length > 40 ||
            currentContent.length < 3 ||
            currentContent.length > 200
          }
          handleClick={updateEntry}
        />
      </div>
    </div>
  );
}

export { ExpandedCard };
