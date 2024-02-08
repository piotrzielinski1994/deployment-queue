import React from 'react';
import { BoardContainerProps } from './board.types';
import Board from './board';
import ColumnContainer from '@/components/column/column.container';

const BoardContainer = (props: BoardContainerProps) => {
  return (
    <Board>
      {Object.entries(props.columns).map(([column, columnItems]) => (
        <ColumnContainer key={column} droppableId={column} heading={column} items={columnItems} />
      ))}
    </Board>
  );
};

export default BoardContainer;
