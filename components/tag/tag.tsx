import React from 'react';
import styles from './tag.module.scss';
import { TagProps } from './tag.types';
import { Draggable } from '@hello-pangea/dnd';

const Tag = ({ tag, index }: TagProps) => {
  return (
    <Draggable draggableId={tag.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-is-dragging={snapshot.isDragging}
            className={styles.wrapper}
            style={{ ...provided.draggableProps.style, '--_colorBg': tag.bgColor }}
          >
            {tag.label}
          </div>
          {snapshot.isDragging && <div className={styles.wrapper}>{tag.label}</div>}
        </>
      )}
    </Draggable>
  );
};

export default Tag;
