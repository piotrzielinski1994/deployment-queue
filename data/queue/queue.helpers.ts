import { tags } from '@/data/tags/tags';
import { columns } from '@/data/columns/columns';
import { DroppableProps } from '@hello-pangea/dnd';
import { generateCardId, generateTagId } from '@/utils/helpers/ids.helpers';
import {
  Queue,
  QueueAction,
  QueueEntity,
  QueueManagableConfig,
  StaticDropZone,
} from './queue.types';
import { Tag } from '../tags/tags.types';

export const defaultQueue: Queue = {
  // columns,
  columns: columns.map((column, index) => {
    return {
      ...column,
      cards: Array.from({ length: 3 }, (_, index) => ({
        id: generateCardId(),
        heading: `John ${index}`,
        tags: Array.from({ length: Math.floor(Math.random() * 5) }, () => {
          const index = Math.floor(Math.random() * tags.length);
          return {
            ...tags[index],
            id: generateTagId(),
          };
        }),
      })),
    };
  }),
};

export const queueReducer = (queue: Queue, action: QueueAction): Queue => {
  console.log('@@@ action.type | ', action.type);
  // @ts-ignore
  if (action.payload.dst?.droppableId === 'card') return queue;
  // TODO: Remove mutations
  switch (action.type) {
    case 'insert': {
      return {
        columns: queue.columns.map((column) => {
          if (column.id !== action.payload.dst.droppableId) return column;
          return {
            ...column,
            cards: [...column.cards, action.payload.card],
          };
        }),
      };
    }
    case 'remove': {
      return queue;
      const cards = columns[action.payload.src.droppableId].cards.filter(
        (card) => card.id !== action.payload.draggableId,
      );

      return {
        ...columns,
        [action.payload.src.droppableId]: {
          ...columns[action.payload.src.droppableId],
          cards: cards,
        },
      };
    }
    case 'reorder': {
      const column = takeColumn(queue, action.payload.src.droppableId);

      if (!column) return queue;

      const cards = [...column.cards];
      const [removed] = cards.splice(action.payload.src.index, 1);

      cards.splice(action.payload.dst.index, 0, removed);

      return {
        columns: queue.columns.map((column) => {
          if (column.id !== action.payload.dst.droppableId) return column;
          return {
            ...column,
            cards,
          };
        }),
      };
    }
    case 'copy': {
      const dstColumn = queue.columns.find((column) => {
        return column.cards.find((card) => card.id === action.payload.dst.droppableId);
      });
      if (dstColumn === undefined) return queue;

      const dstCards = [...dstColumn.cards];
      const dstCard = dstCards.find((card) => card.id === action.payload.dst.droppableId);
      if (dstCard === undefined) return queue;

      const dstTags = [...dstCard.tags];
      const tag = tags[action.payload.src.index];
      if (tag === undefined) return queue;

      const copiedTag: Tag = { ...tag, id: generateTagId(), canBeRemoved: true };

      dstTags.splice(action.payload.dst.index, 0, copiedTag);

      return {
        columns: queue.columns.map((column) => {
          if (column.id !== dstColumn.id) return column;
          return {
            ...dstColumn,
            cards: dstCards.map((card) => {
              if (card.id !== dstCard.id) return card;
              return {
                ...card,
                tags: dstTags,
              };
            }),
          };
        }),
      };
    }
    case 'move': {
      const srcColumn = takeColumn(queue, action.payload.src.droppableId);
      if (srcColumn === undefined) return queue;
      const dstColumn = takeColumn(queue, action.payload.dst.droppableId);
      if (dstColumn === undefined) return queue;

      const srcCards = [...srcColumn.cards];
      const dstCards = [...dstColumn.cards];
      const [removed] = srcCards.splice(action.payload.src.index, 1);

      dstCards.splice(action.payload.dst.index, 0, removed);

      return {
        columns: queue.columns.map((column) => {
          if (column.id === srcColumn.id) return { ...column, cards: srcCards };
          if (column.id === dstColumn.id) return { ...column, cards: dstCards };
          return column;
        }),
      };
    }
    default: {
      return queue;
    }
  }
};

export const takeQueueActionType = (
  source: DroppableProps['droppableId'],
  destination: DroppableProps['droppableId'],
): QueueAction['type'] => {
  console.log('@@@ source, destination | ', source, destination);
  if (!destination) {
    return 'remove';
  }

  if (!source) {
    return 'insert';
  }

  switch (source) {
    case destination:
      return 'reorder';
    case StaticDropZone.TAGS:
      return 'copy';
    default:
      return 'move';
  }
};

export const takeQueueAction = (
  metadata: QueueManagableConfig,
  options: { name?: string } | undefined = undefined,
): QueueAction | undefined => {
  if (!metadata.dst?.droppableId) {
    return {
      type: 'remove',
      payload: {
        src: {
          droppableId: metadata.src.droppableId,
          index: metadata.src.index,
        },
        draggableId: metadata.draggableId,
      },
    };
  }

  const actionType = takeQueueActionType(metadata.src.droppableId, metadata.dst.droppableId);
  console.log('@@@ actionType | ', actionType);
  const src = {
    droppableId: metadata.src.droppableId,
    index: metadata.src.index,
  };

  if (actionType === 'insert') {
    return {
      type: 'insert',
      payload: {
        dst: metadata.dst,
        name: options?.name ?? '',
      },
    };
  }

  if (actionType === 'remove') {
    return {
      type: 'remove',
      payload: {
        src,
        draggableId: metadata.draggableId,
      },
    };
  }

  return {
    type: actionType,
    payload: {
      src,
      dst: metadata.dst,
    },
  };
};

const takeColumn = (queue: Queue, columnId: string) => {
  return queue.columns.find((column) => column.id === columnId);
};

export const takeQueueEntity = (id: string): QueueEntity | null => {
  const stringifiedTypes = Object.values(QueueEntity).map(String);
  const prefix = id.split('__').at(0) as QueueEntity;
  if (!stringifiedTypes.includes(prefix)) return null;
  return prefix as QueueEntity;
};
