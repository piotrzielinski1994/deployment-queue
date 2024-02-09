import React, { ForwardedRef, forwardRef } from 'react';
import styles from './column.module.scss';
import { ColumnProps } from './column.types';

const Column = forwardRef(
  ({ heading, addCard, ...props }: ColumnProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          {addCard && (
            <form onSubmit={addCard}>
              <input
                type="text"
                name="name"
                required
                placeholder="Type your name"
                className={styles.input}
              />
            </form>
            // <button onClick={addCard} type="button">
            //   Add Card
            // </button>
          )}
        </header>
        <div className={styles.container} ref={ref} {...props} data-droppable="column" />
      </div>
    );
  }
);

Column.displayName = 'Column';

export default Column;
