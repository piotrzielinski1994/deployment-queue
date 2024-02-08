import { Draggable, Droppable } from '@hello-pangea/dnd';
import React from 'react';
import Tag from '@/components/tag/tag';
import { ColumnContainerProps } from './column.types';
import Column from './column';

const ColumnContainer = ({ droppableId, items, ...props }: ColumnContainerProps) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <Column ref={provided.innerRef} data-is-dragging={snapshot.isDraggingOver} {...props}>
          {items.length === 0
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
          {provided.placeholder}
        </Column>
      )}
    </Droppable>
  );
};

ColumnContainer.displayName = 'ColumnContainer';

export default ColumnContainer;
