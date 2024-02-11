import Tag from '@/components/tag/tag';
import { mergeRefs } from '@/utils/helpers/refs.helpers';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { forwardRef } from 'react';
import styles from './card.module.scss';
import { CardProps } from './card.types';

const Card = forwardRef(({ card, index }: CardProps, ref) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(dragProvider, dragSnapshot) => (
        <Droppable droppableId={card.id} type="tags">
          {(droppableProvider, droppableSnapshot) => {
            const combinedRef = mergeRefs(ref, dragProvider.innerRef);

            return (
              <div
                className={styles.wrapper}
                data-draggable="card"
                data-is-dragging={dragSnapshot.isDragging}
                ref={combinedRef}
                {...dragProvider.draggableProps}
                {...dragProvider.dragHandleProps}
                style={dragProvider.draggableProps.style}
              >
                <div
                  className={styles.droppable}
                  ref={droppableProvider.innerRef}
                  data-is-dragging-over={droppableSnapshot.isDraggingOver}
                >
                  <h3 className={styles.heading}>{card.heading}</h3>

                  <div className={styles.content}>
                    {card.tags.length === 0 ? (
                      <p className={styles.empty}>No tags</p>
                    ) : (
                      card.tags.map((tag, index) => {
                        return <Tag key={tag.id} tag={tag} index={index} />;
                      })
                    )}
                  </div>
                  {droppableProvider.placeholder}
                </div>
              </div>
            );
          }}
        </Droppable>
      )}
    </Draggable>
  );
});

export default Card;
