import { v4 as uuid } from 'uuid';
import { tags } from '@/data/tags';
import { Action, Columns, ICard } from './dashboard.types';
import { columns } from '@/data/columns';
import { DropResult, DroppableProps } from '@hello-pangea/dnd';

export const defaultColumns: Columns = {
  ...columns.reduce(
    (acc, column) => ({
      ...acc,
      // [column.id]: column,
      [column.id]: {
        ...column,
        cards: [
          {
            id: uuid(),
            heading: 'John',
            tags: [
              {
                id: uuid(),
                label: tags[0].label,
              },
            ],
          },
          {
            id: uuid(),
            heading: 'Doe',
            tags: [
              {
                id: uuid(),
                label: tags[1].label,
              },
              {
                id: uuid(),
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

export const columnsReducer = (columns: Columns, action: Action): Columns => {
  if (action.payload.dst?.droppableId === 'card') return columns;
  // TODO: Remove mutations
  switch (action.type) {
    case 'insert': {
      const card: ICard = {
        id: uuid(),
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

export const takeActionType = (
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

export const takeAction = (
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

  const actionType = takeActionType(metadata.source.droppableId, metadata.destination.droppableId);
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
