import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import Sidebar from './sidebar';
import { SidebarContainerProps } from './sidebar.types';
import TagContainer from '../tag/tag.container';

const SidebarContainer = ({ droppableId, tags }: SidebarContainerProps) => {
  return (
    <Droppable droppableId={droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <Sidebar ref={provided.innerRef} data-is-dragging={snapshot.isDraggingOver}>
          {tags.map((tag, index) => (
            <TagContainer key={tag.id} tag={tag} index={index} />
          ))}
        </Sidebar>
      )}
    </Droppable>
  );
};

export default SidebarContainer;
