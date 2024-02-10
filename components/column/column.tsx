import Card from '@/components/card/card';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';
import { DndDroppable } from '@/data/dnd/dnd.types';
import { Droppable } from '@hello-pangea/dnd';
import styles from './column.module.scss';
import { ColumnProps } from './column.types';

const Column = ({ column }: ColumnProps) => {
  const { addCard } = useQueue();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    if (!name) return;

    event.target.elements['name'].value = '';

    addCard(name, column.id);
  };

  return (
    <Droppable droppableId={column.id} type={DndDroppable.CARDS}>
      {(droppableProvider, droppableSnapshot) => (
        <div
          className={styles.wrapper}
          ref={droppableProvider.innerRef}
          data-is-dragging-over={droppableSnapshot.isDraggingOver}
        >
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
          <div className={styles.container} data-droppable="column">
            {column.cards.map((card, index) => {
              return <Card key={card.id} card={card} index={index} />;
            })}
          </div>
          {droppableProvider.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
