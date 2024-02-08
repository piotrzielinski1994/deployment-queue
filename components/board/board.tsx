import React, { ForwardedRef, forwardRef } from 'react';
import styles from './board.module.scss';
import { BoardProps } from './board.types';

const Board = forwardRef((props: BoardProps, ref: ForwardedRef<HTMLDivElement>) => {
  return <div className={styles.wrapper} ref={ref} {...props} />;
});

Board.displayName = 'Tag';

export default Board;
