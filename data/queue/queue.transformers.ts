import { DropResult } from '@hello-pangea/dnd';
import { QueueAction, QueueEntity, QueueManagableConfig, StaticDropZone } from './queue.types';
import { DndDroppable } from '../dnd/dnd.types';
import { takeQueueEntity } from './queue.helpers';
import { Column } from '../columns/columns.types';
import { Card } from '../cards/cards.types';
import { tags } from '../tags/tags';

export const toQueueManagableConfig = ({
  type,
  draggableId,
  source,
  destination,
}: DropResult): QueueManagableConfig => {
  const dst = !destination
    ? null
    : {
        droppableId: destination?.droppableId,
        index: destination?.index,
        droppableType: toDroppableType(type),
      };
  return {
    draggableId: draggableId,
    src: source,
    dst,
  };
};

const toDroppableType = (type: string): DndDroppable | null => {
  const stringifiedTypes = Object.values(DndDroppable).map(String);
  if (!stringifiedTypes.includes(type)) return null;
  return type as DndDroppable;
};

export const toQueueAction = (metadata: DropResult): QueueAction | undefined => {
  if (!metadata.destination) return;

  const draggedItemType = takeQueueEntity(metadata.draggableId);

  if (draggedItemType === null) return;

  switch (metadata.source.droppableId) {
    case metadata.destination.droppableId: {
      if (draggedItemType === QueueEntity.CARD) {
        return {
          type: 'reorder-cards',
          payload: {
            columnId: metadata.source.droppableId as Column['id'],
            srcIndex: metadata.source.index,
            dstIndex: metadata.destination.index,
          },
        };
      }
      if (draggedItemType === QueueEntity.TAG) {
        return {
          type: 'reorder-tags',
          payload: {
            cardId: metadata.source.droppableId as Card['id'],
            srcIndex: metadata.source.index,
            dstIndex: metadata.destination.index,
          },
        };
      }
      return undefined;
    }
    case StaticDropZone.TAGS:
      console.log('@@@ metadata.destination.droppableId | ', metadata.destination.droppableId);
      const tagToDuplicate = tags[metadata.source.index];
      if (!tagToDuplicate) return undefined;
      return {
        type: 'add-tag',
        payload: {
          cardId: metadata.destination.droppableId as Card['id'],
          dstIndex: metadata.destination.index,
          tag: {
            ...tagToDuplicate,
            canBeRemoved: true,
          },
        },
      };
    default: {
      if (draggedItemType === QueueEntity.CARD) {
        return {
          type: 'move-card-between-columns',
          payload: {
            srcColumnId: metadata.source.droppableId as Column['id'],
            srcIndex: metadata.source.index,
            dstColumnId: metadata.destination.droppableId as Column['id'],
            dstIndex: metadata.destination.index,
          },
        };
      }
      if (draggedItemType === QueueEntity.TAG) {
        return {
          type: 'move-tag-between-cards',
          payload: {
            srcCardId: metadata.source.droppableId as Card['id'],
            srcIndex: metadata.source.index,
            dstCardId: metadata.destination.droppableId as Card['id'],
            dstIndex: metadata.destination.index,
          },
        };
      }
      return undefined;
    }
  }
};
