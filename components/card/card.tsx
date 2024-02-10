import Tag from '@/components/tag/tag';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import styles from './card.module.scss';
import { CardProps } from './card.types';

const Card = ({ card, index }: CardProps) => {
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
            <Droppable droppableId={card.id} type="tags">
              {(provided, snapshot) => (
                <div
                  className={styles.content}
                  ref={provided.innerRef}
                  data-is-dragging-over={snapshot.isDraggingOver}
                >
                  {card.tags.length === 0 ? (
                    <p className={styles.empty}>No tags</p>
                  ) : (
                    card.tags.map((tag, index) => {
                      return <Tag key={tag.id} tag={tag} index={index} />;
                    })
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
