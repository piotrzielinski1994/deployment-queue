import { Draggable } from '@hello-pangea/dnd';
import React from 'react';
import Tag from './tag';
import { TagContainerProps } from './tag.types';

const TagContainer = ({ tag, index }: TagContainerProps) => {
  return (
    <Draggable draggableId={tag.id} index={index}>
      {(provided, snapshot) => (
        <>
          <Tag
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-is-dragging={snapshot.isDragging}
            style={provided.draggableProps.style}
          >
            {tag.label}
          </Tag>
          {snapshot.isDragging && <Tag>{tag.label}</Tag>}
        </>
      )}
    </Draggable>
  );
};

export default TagContainer;
