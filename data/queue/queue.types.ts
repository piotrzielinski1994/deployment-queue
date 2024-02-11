import { Card } from '@/data/cards/cards.types';
import { Column } from '@/data/columns/columns.types';
import { Tag } from '@/data/tags/tags.types';
import { BeforeCapture } from '@hello-pangea/dnd';
import { DndDroppable } from '../dnd/dnd.types';

export interface QueueManager {
  queue: Queue;
  isDragging: boolean;
  manageQueue: (data: QueueManagableConfig) => void;
  onDragStart: (metadata: BeforeCapture) => void;
  addCard: (card: Card, columnId: Column['id']) => void;
  removeCard: (cardId: Card['id']) => void;
  removeTag: (tagId: Tag['id']) => void;
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

export type QueueAction =
  | QueueInsert
  | QueueRemoveCard
  | QueueRemoveTag
  | QueueReorder
  | QueueCopy
  | QueueMove;

interface QueueInsert {
  type: 'insert';
  payload: Omit<QueuePayload, 'src'> & {
    card: Card;
  };
}

interface QueueRemoveCard {
  type: 'remove-card';
  payload: {
    cardId: Card['id'];
  };
}

interface QueueRemoveTag {
  type: 'remove-tag';
  payload: {
    tagId: Tag['id'];
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
