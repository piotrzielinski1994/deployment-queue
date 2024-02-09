import { Draggable, Droppable } from '@hello-pangea/dnd';
import React from 'react';
// import Card from './card';
import { CardContainerProps } from './card.types';
import TagContainer from '@/components/tag/tag.container';
import styles from './card.module.scss';

const CardContainer = ({ card, index }: CardContainerProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            className={styles.wrapper}
            data-draggable="card"
            data-is-dragging={snapshot.isDragging}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={provided.draggableProps.style}
          >
            <h3 className={styles.heading}>{card.heading}</h3>
            <Droppable droppableId={card.id} type="card">
              {(provided, snapshot) => (
                <div
                  className={styles.content}
                  data-droppable="card"
                  ref={provided.innerRef}
                  data-is-dragging-over={snapshot.isDraggingOver}
                >
                  {card.tags.map((tag, index) => {
                    return <TagContainer key={tag.id} tag={tag} index={index} />;
                  })}
                </div>
              )}
            </Droppable>
          </div>
          {/* <Card
            data-dragggable="card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-is-dragging={snapshot.isDragging}
            style={provided.draggableProps.style}
            heading={card.heading}
          >
            <Droppable droppableId={card.id} type="card">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} data-droppable="card">
                  {card.tags.map((tag, index) => {
                    return <TagContainer key={tag.id} tag={tag} index={index} />;
                  })}
                </div>
              )}
            </Droppable>
          </Card> */}
          {/* {snapshot.isDragging && <Card>{card.label}</Card>} */}
        </>
      )}
    </Draggable>
  );
};

export default CardContainer;
