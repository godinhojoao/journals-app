import React, { useState } from 'react';

import { ExpandedCard } from './ExpandedCard';

import './NoteCard.scss';

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  className?: string;
}

function NoteCard(props: NoteCardProps): JSX.Element {
  const { id, title, content, className } = props;
  const [isExpandedCard, setIsExpandedCard] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);

  return (
    <>
      <div
        className={`note-card ${className ? className : ''}`}
        onClick={(): void => {
          setIsExpandedCard(!isExpandedCard);
        }}
      >
        {cardTitle}
      </div>
      {isExpandedCard && (
        <ExpandedCard
          id={id}
          title={cardTitle}
          content={content}
          toggleView={setIsExpandedCard}
          setCardTitle={setCardTitle}
        />
      )}
    </>
  );
}

export { NoteCard };
