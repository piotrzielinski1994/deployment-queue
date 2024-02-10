import { Column } from '@/data/columns/columns.types';
import { Dispatch } from 'react';

export type Columns = Record<string, Column>;
export type ColumnDispatcher = Dispatch<Action>;

export type Action = ActionInsert | ActionRemove | ActionReorder | ActionCopy | ActionMove;

interface ActionInsert {
  type: 'insert';
  payload: Omit<ActionPayload, 'src'> & {
    name: string;
  };
}

interface ActionRemove {
  type: 'remove';
  payload: Omit<ActionPayload, 'dst'> & {
    draggableId: string;
  };
}

interface ActionReorder {
  type: 'reorder';
  payload: ActionPayload;
}

interface ActionCopy {
  type: 'copy';
  payload: ActionPayload;
}

interface ActionMove {
  type: 'move';
  payload: ActionPayload;
}

interface ActionPayload {
  src: {
    droppableId: string;
    index: number;
  };
  dst: {
    droppableId: string;
    index: number;
    droppableType: string;
  };
}
