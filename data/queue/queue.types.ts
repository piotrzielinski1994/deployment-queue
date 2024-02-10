import { Column } from '@/data/columns/columns.types';

export interface QueueManager {
  queue: {
    columns: Record<Column['id'], Column>;
  };
  manageQueue: (data: QueueManagableConfig) => void;
  addCard: (name: string, columnId: Column['id']) => void;
}

export interface QueueManagableConfig {
  src: {
    droppableId: string;
    index: number;
  };
  dst: {
    droppableId: string;
    index: number;
  } | null;
}

export type Action = QueueInsert | QueueRemove | QueueReorder | QueueCopy | QueueMove;

interface QueueInsert {
  type: 'insert';
  payload: Omit<QueuePayload, 'src'> & {
    name: string;
  };
}

interface QueueRemove {
  type: 'remove';
  payload: Omit<QueuePayload, 'dst'> & {
    draggableId: string;
  };
}

interface QueueReorder {
  type: 'reorder';
  payload: QueuePayload;
}

interface QueueCopy {
  type: 'copy';
  payload: QueuePayload;
}

interface QueueMove {
  type: 'move';
  payload: QueuePayload;
}

interface QueuePayload {
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
