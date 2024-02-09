import { DropResult } from '@hello-pangea/dnd';
import { Dispatch } from 'react';

// =====================
export interface ITag {
  id: string;
  label: string;
}

export interface ICard {
  id: string;
  heading: string;
  tags: ITag[];
}

export interface IColumn {
  id: string;
  heading: string;
  canAdd?: true;
  cards: ICard[];
}
// =====================

export type Columns = Record<string, IColumn>;
export type ColumnDispatcher = Dispatch<Action>;

export type Action = ActionInsert | ActionReorder | ActionCopy | ActionMove;

interface ActionInsert {
  type: 'insert';
  payload: Omit<ActionPayload, 'src'> & {
    name: string;
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
