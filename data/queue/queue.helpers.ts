import { v4 as uuid } from 'uuid';
import { tags } from '@/data/tags/tags';
import { Action, Columns } from './dashboard.types';
import { columns } from '@/data/columns/columns';
import { DropResult, DroppableProps } from '@hello-pangea/dnd';
import { generateCardId, generateTagId } from '@/utils/id';
import { Card } from '@/data/cards/cards.types';

export const defaultQueue: Columns = {
  ...columns.reduce(
    (acc, column) => ({
      ...acc,
      // [column.id]: column,
      [column.id]: {
        ...column,
        cards: [
          {
            id: generateCardId(),
            heading: 'John',
            tags: [
              {
                id: generateTagId(),
                label: tags[0].label,
              },
            ],
          },
          {
            id: generateCardId(),
            heading: 'Doe',
            tags: [
              {
                id: generateTagId(),
                label: tags[1].label,
              },
              {
                id: generateTagId(),
                label: tags[2].label,
              },
            ],
          },
        ],
      },
    }),
    {}
  ),
};

export const queueReducer = (columns: Columns, action: Action): Columns => {
  // @ts-ignore
  if (action.payload.dst?.droppableId === 'card') return columns;
  // TODO: Remove mutations
  switch (action.type) {
    case 'insert': {
      const card: Card = {
        id: generateCardId(),
        heading: action.payload.name,
        tags: [],
      };

      return {
        ...columns,
        [action.payload.dst.droppableId]: {
          ...columns[action.payload.dst.droppableId],
          cards: [...columns[action.payload.dst.droppableId].cards, card],
        },
      };
    }
    case 'remove': {
      const cards = columns[action.payload.src.droppableId].cards.filter(
        (card) => card.id !== action.payload.draggableId
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
      const cards = Array.from(columns[action.payload.src.droppableId].cards);
      const [removed] = cards.splice(action.payload.src.index, 1);

      cards.splice(action.payload.dst.index, 0, removed);

      return {
        ...columns,
        [action.payload.src.droppableId]: {
          ...columns[action.payload.src.droppableId],
          cards: cards,
        },
      };
    }
    case 'copy': {
      const srcCards = Array.from(columns[action.payload.src.droppableId].cards);
      const dstCards = Array.from(columns[action.payload.dst.droppableId].cards);
      const card = srcCards[action.payload.src.index];

      dstCards.splice(action.payload.dst.index, 0, { ...card, id: uuid() });

      return {
        ...columns,
        [action.payload.dst.droppableId]: {
          ...columns[action.payload.dst.droppableId],
          cards: dstCards,
        },
      };
    }
    case 'move': {
      const srcCards = Array.from(columns[action.payload.src.droppableId].cards);
      const dstCards = Array.from(columns[action.payload.dst.droppableId].cards);
      const [removed] = srcCards.splice(action.payload.src.index, 1);

      dstCards.splice(action.payload.dst.index, 0, removed);

      return {
        ...columns,
        [action.payload.src.droppableId]: {
          ...columns[action.payload.src.droppableId],
          cards: srcCards,
        },
        [action.payload.dst.droppableId]: {
          ...columns[action.payload.dst.droppableId],
          cards: dstCards,
        },
      };
    }
    default: {
      return columns;
    }
  }
};

export const takeQueueActionType = (
  source: DroppableProps['droppableId'],
  destination: DroppableProps['droppableId']
): Action['type'] => {
  if (!destination) {
    return 'remove';
  }

  if (!source) {
    return 'insert';
  }

  switch (source) {
    case destination:
      return 'reorder';
    case 'ITEMS':
      return 'copy';
    default:
      return 'move';
  }
};

export const takeQueueAction = (
  metadata: DropResult,
  options: { name?: string } | undefined = undefined
): Action | undefined => {
  if (!metadata.destination?.droppableId) {
    return {
      type: 'remove',
      payload: {
        src: {
          droppableId: metadata.source.droppableId,
          index: metadata.source.index,
        },
        draggableId: metadata.draggableId,
      },
    };
  }

  const actionType = takeQueueActionType(
    metadata.source.droppableId,
    metadata.destination.droppableId
  );
  const src = {
    droppableId: metadata.source.droppableId,
    index: metadata.source.index,
  };
  const dst = {
    droppableType: metadata.type,
    droppableId: metadata.destination.droppableId,
    index: metadata.destination.index,
  };

  if (actionType === 'insert') {
    return {
      type: 'insert',
      payload: {
        dst,
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
      dst,
    },
  };
};
