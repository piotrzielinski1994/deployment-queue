import React, { useMemo } from 'react';
import styles from './tag.module.scss';
import { TagProps } from './tag.types';
import { Draggable } from '@hello-pangea/dnd';

const Tag = ({ tag, index }: TagProps) => {
  const customStyles = {
    '--_colorBg': tag.bgColor,
  };

  const content = useMemo(() => {
    return (
      <>
        <span className={styles.label}>{tag.label}</span>
        {tag.canBeRemoved && (
          <button
            type="button"
            className={styles.btnRemove}
            onClick={() => console.log('@@@ remove tag')}
          >
            &times;
          </button>
        )}
      </>
    );
  }, [tag]);

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
            style={{ ...provided.draggableProps.style, ...customStyles }}
          >
            {content}
          </div>
          {snapshot.isDragging && (
            <div className={styles.wrapper} style={customStyles}>
              {content}
            </div>
          )}
        </>
      )}
    </Draggable>
  );
};

export default Tag;
