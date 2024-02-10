import Tag from '@/components/tag/tag';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import styles from './card.module.scss';
import { CardProps } from './card.types';

const Card = ({ card, index }: CardProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(dragProvider, dragSnapshot) => (
        <Droppable droppableId={card.id} type="tags">
          {(dropProvider, dropSnapshot) => (
            <div
              className={styles.wrapper}
              data-draggable="card"
              data-is-dragging={dragSnapshot.isDragging}
              ref={dragProvider.innerRef}
              {...dragProvider.draggableProps}
              {...dragProvider.dragHandleProps}
              style={dragProvider.draggableProps.style}
            >
              <div
                className={styles.droppable}
                ref={dropProvider.innerRef}
                data-is-dragging-over={dropSnapshot.isDraggingOver}
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
              </div>
            </div>
          )}
        </Droppable>
      )}
    </Draggable>
  );
};

export default Card;
