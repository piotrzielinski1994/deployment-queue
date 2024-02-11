import Card from '@/components/card/card';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';
import { DndDroppable } from '@/data/dnd/dnd.types';
import { Droppable } from '@hello-pangea/dnd';
import styles from './column.module.scss';
import { ColumnProps } from './column.types';
import { generateCardId } from '@/utils/helpers/ids.helpers';
import { useAddCard } from './column.hooks';

const Column = ({ column }: ColumnProps) => {
  const { addCard } = useQueue();
  const { idOfNewlyAddedCard, scrollToCardId, lastCardRef } = useAddCard(column.cards.length);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    if (!name) return;

    event.target.elements['name'].value = '';

    const id = generateCardId();

    addCard(
      {
        id,
        heading: name,
        tags: [],
      },
      column.id,
    );

    scrollToCardId(id);
  };

  return (
    <Droppable droppableId={column.id} type={DndDroppable.CARDS}>
      {(droppableProvider, droppableSnapshot) => (
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h2 className={styles.heading}>{column.heading}</h2>
            {column.canAddCard && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Type your name"
                  className={styles.input}
                />
              </form>
            )}
          </header>
          <div
            className={styles.scrollableContainer}
            data-droppable="column"
            ref={droppableProvider.innerRef}
          >
            <div
              className={styles.container}
              data-is-dragging-over={droppableSnapshot.isDraggingOver}
            >
              {column.cards.map((card, index) => {
                return (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    ref={card.id === idOfNewlyAddedCard.current ? lastCardRef : null}
                    nativeProps={{
                      'data-newly-added': card.id === idOfNewlyAddedCard.current,
                      // 'data-newly-added': true,
                    }}
                  />
                );
              })}
              {droppableProvider.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
