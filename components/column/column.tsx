import Card from '@/components/card/card';
import { Droppable } from '@hello-pangea/dnd';
import styles from './column.module.scss';
import { ColumnProps } from './column.types';

const Column = ({ column, dispatch }: ColumnProps) => {
  const addCard = (event: any) => {
    event.preventDefault();
    const name = event.target.elements.name.value;

    if (!name) return;

    event.target.elements.name.value = '';

    dispatch({
      type: 'insert',
      payload: {
        name,
        dst: {
          droppableType: 'column',
          droppableId: column.id,
          index: -1,
        },
      },
    });
  };

  return (
    <Droppable droppableId={column.id} type="cards">
      {(provided, snapshot) => (
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h2 className={styles.heading}>{column.heading}</h2>
            {column.canAdd && (
              <form onSubmit={addCard}>
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
            className={styles.container}
            data-droppable="column"
            ref={provided.innerRef}
            data-is-dragging-over={snapshot.isDraggingOver}
          >
            {column.cards.map((card, index) => {
              return <Card key={card.id} card={card} index={index} />;
            })}
          </div>
        </div>
      )}
    </Droppable>
  );
};

Column.displayName = 'ColumnContainer';

export default Column;
