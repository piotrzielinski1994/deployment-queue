import { Column } from '@/data/columns/columns.types';
import { DndDroppable } from '../dnd/dnd.types';
import { Card } from '@/data/cards/cards.types';
import { BeforeCapture } from '@hello-pangea/dnd';

export interface QueueManager {
  queue: Queue;
  isDragging: boolean;
  manageQueue: (data: QueueManagableConfig) => void;
  addCard: (card: Card, columnId: Column['id']) => void;
  onDragStart: (metadata: BeforeCapture) => void;
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
    card: Card;
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

export enum QueueEntity {
  COLUMN = 'column',
  CARD = 'card',
  TAG = 'tag',
}

export enum StaticDropZone {
  TAGS = 'tags',
}
