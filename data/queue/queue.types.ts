import { Card } from '@/data/cards/cards.types';
import { Column } from '@/data/columns/columns.types';
import { Tag } from '@/data/tags/tags.types';
import { BeforeCapture, DropResult } from '@hello-pangea/dnd';
import { DndDroppable } from '../dnd/dnd.types';

export interface QueueManager {
  queue: Queue;
  isDragging: boolean;
  onDragStart: (metadata: BeforeCapture) => void;
  onDragEnd: (metadata: DropResult) => void;
  addCard: (card: Card, columnId: Column['id']) => void;
  removeCard: (cardId: Card['id']) => void;
  removeTag: (tagId: Tag['id']) => void;
  toggleFreezeStatus: () => void;
}

export interface Queue {
  columns: Column[];
  isFrozen: boolean;
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
  | QueueAddCard
  | QueueRemoveCard
  | QueueRemoveTag
  | QueueReorderCards
  | QueueReorderTags
  | QueueAddTag
  | QueueMoveCardBetweenColumns
  | QueueMoveTagBetweenCards
  | QueueToggleFreezeStatus;

interface QueueAddCard {
  type: 'add-card';
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

interface QueueReorderCards {
  type: 'reorder-cards';
  payload: {
    columnId: Column['id'];
    srcIndex: number;
    dstIndex: number;
  };
}

interface QueueReorderTags {
  type: 'reorder-tags';
  payload: {
    cardId: Card['id'];
    srcIndex: number;
    dstIndex: number;
  };
}

interface QueueAddTag {
  type: 'add-tag';
  payload: {
    cardId: Card['id'];
    dstIndex: number;
    tag: Tag;
  };
}

interface QueueMoveCardBetweenColumns {
  type: 'move-card-between-columns';
  payload: {
    srcColumnId: Column['id'];
    srcIndex: number;
    dstColumnId: Column['id'];
    dstIndex: number;
  };
}

interface QueueMoveTagBetweenCards {
  type: 'move-tag-between-cards';
  payload: {
    srcCardId: Card['id'];
    srcIndex: number;
    dstCardId: Card['id'];
    dstIndex: number;
  };
}

interface QueueToggleFreezeStatus {
  type: 'toggle-freeze-status';
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
