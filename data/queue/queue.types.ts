import { Column } from '@/data/columns/columns.types';
import { DndDroppable } from '../dnd/dnd.types';

export interface QueueManager {
  queue: Queue;
  manageQueue: (data: QueueManagableConfig) => void;
  addCard: (name: string, columnId: Column['id']) => void;
}

export interface Queue {
  columns: Column[];
}

export interface QueueManagableConfig {
  draggableId: string;
  src: {
    droppableId: string;
    index: number;
  };
  dst: {
    droppableType: DndDroppable | null;
    droppableId: string;
    index: number;
  } | null;
}

export type QueueAction = QueueInsert | QueueRemove | QueueReorder | QueueCopy | QueueMove;

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
