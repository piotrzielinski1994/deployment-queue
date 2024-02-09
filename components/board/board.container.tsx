import React from 'react';
import { BoardContainerProps } from './board.types';
import Board from './board';
import ColumnContainer from '@/components/column/column.container';

const BoardContainer = ({ columns, dispatch }: BoardContainerProps) => {
  return (
    <Board>
      {Object.entries(columns).map(([id, column]) => (
        <ColumnContainer key={id} column={column} dispatch={dispatch} />
      ))}
    </Board>
  );
};

export default BoardContainer;
