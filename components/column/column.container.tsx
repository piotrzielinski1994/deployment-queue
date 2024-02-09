import { Draggable, Droppable } from '@hello-pangea/dnd';
import React from 'react';
import Tag from '@/components/tag/tag';
import { ColumnContainerProps } from './column.types';
import Column from './column';
import CardContainer from '@/components/card/card.container';

const ColumnContainer = ({ column, dispatch, ...props }: ColumnContainerProps) => {
  const addCard = (event: any) => {
    event.preventDefault();
    const name = event.target.elements.name.value;

    if (!name) return;

    event.target.elements.name.value = '';

    dispatch({
      type: 'insert',
      payload: {
        name,
        dst: {
          droppableType: 'column',
          droppableId: column.id,
          index: -1,
        },
      },
    });
  };

  return (
    <Droppable droppableId={column.id} type="column">
      {(provided, snapshot) => (
        <Column
          heading={column.heading}
          addCard={column.canAdd && addCard}
          ref={provided.innerRef}
          data-is-dragging-over={snapshot.isDraggingOver}
          {...props}
        >
          {column.cards.map((card, index) => {
            return <CardContainer key={card.id} card={card} index={index} />;
          })}

          {/* {items.length === 0
            ? !provided.placeholder && <div className={''}>Drop items here</div>
            : items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Tag
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      data-is-dragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                    >
                      {item.label}
                    </Tag>
                  )}
                </Draggable>
              ))}
          {provided.placeholder} */}
        </Column>
      )}
    </Droppable>
  );
};

ColumnContainer.displayName = 'ColumnContainer';

export default ColumnContainer;
