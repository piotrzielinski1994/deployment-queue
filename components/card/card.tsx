import Tag from '@/components/tag/tag';
import { mergeRefs } from '@/utils/helpers/refs.helpers';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ForwardedRef, forwardRef } from 'react';
import styles from './card.module.scss';
import { CardProps } from './card.types';
import { mergeClasses } from '@/utils/helpers/classnames.helpers';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';

const Card = forwardRef(
  ({ card, index, nativeProps }: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { removeCard } = useQueue();
    return (
      <Draggable draggableId={card.id} index={index}>
        {(dragProvider, dragSnapshot) => (
          <Droppable droppableId={card.id} type="tags">
            {(droppableProvider, droppableSnapshot) => {
              const combinedRef = mergeRefs(ref, dragProvider.innerRef);

              return (
                <div
                  {...nativeProps}
                  className={mergeClasses(nativeProps?.className, styles.wrapper)}
                  data-draggable="card"
                  data-is-dragging={dragSnapshot.isDragging}
                  ref={combinedRef}
                  {...dragProvider.draggableProps}
                  {...dragProvider.dragHandleProps}
                  style={{ ...nativeProps?.style, ...dragProvider.draggableProps.style }}
                >
                  <div
                    className={styles.droppable}
                    ref={droppableProvider.innerRef}
                    data-is-dragging-over={droppableSnapshot.isDraggingOver}
                  >
                    <header className={styles.header}>
                      <h4 className={styles.heading}>{card.heading}</h4>
                      <button
                        type="button"
                        className={styles.btnRemove}
                        onClick={() => removeCard(card.id)}
                      >
                        &times;
                      </button>
                    </header>

                    <div className={styles.content}>
                      {card.tags.length === 0 ? (
                        <p className={styles.empty}>No tags</p>
                      ) : (
                        card.tags.map((tag, index) => {
                          return <Tag key={tag.id} tag={tag} index={index} />;
                        })
                      )}
                      {droppableProvider.placeholder}
                    </div>
                  </div>
                </div>
              );
            }}
          </Droppable>
        )}
      </Draggable>
    );
  },
);

export default Card;
