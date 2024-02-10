import { Column } from '@/data/columns/columns.types';
import { Dispatch } from 'react';

export interface QueueManager {
  queue: {
    columns: Record<Column['id'], Column>;
  };
  dispatchQueue: Dispatch<Action>;
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
