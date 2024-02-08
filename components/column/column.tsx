import React, { ForwardedRef, HTMLProps, forwardRef } from 'react';
import styles from './column.module.scss';
import { ColumnProps } from './column.types';

const Column = forwardRef(
  ({ heading, ...props }: ColumnProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.container} ref={ref} {...props} />
      </div>
    );
  }
);

Column.displayName = 'Column';

export default Column;
