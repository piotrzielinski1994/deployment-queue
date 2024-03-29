import { tags as allTags } from '@/data/tags/tags';
import { columns } from '@/data/columns/columns';
import { generateCardId, generateTagId } from '@/utils/helpers/ids.helpers';
import { Queue, QueueAction, QueueEntity } from './queue.types';
import { Card } from '@/data/cards/cards.types';
import { Tag } from '@/data/tags/tags.types';

export const defaultQueue: Queue = {
  // columns,
  columns: columns.map((column, index) => {
    return {
      ...column,
      cards: Array.from({ length: 3 }, (_, index) => ({
        id: generateCardId(),
        heading: `John ${index}`,
        tags: Array.from({ length: Math.floor(Math.random() * 5) }, () => {
          const index = Math.floor(Math.random() * allTags.length);
          return {
            ...allTags[index],
            id: generateTagId(),
            canBeRemoved: true,
          };
        }),
      })),
    };
  }),
  tags: allTags,
  isFrozen: false,
};

export const queueReducer = (queue: Queue, action: QueueAction): Queue => {
  // TODO: Remove mutations
  switch (action.type) {
    case 'add-card': {
      return {
        ...queue,
        columns: queue.columns.map((column) => {
          if (column.id !== action.payload.dst.droppableId) return column;
          return {
            ...column,
            cards: [...column.cards, action.payload.card],
          };
        }),
      };
    }
    case 'add-tag': {
      const dstCard = takeCard(queue, action.payload.cardId);
      if (dstCard === undefined) return queue;

      const dstTags = [...dstCard.tags];
      const newTag: Tag = {
        ...queue.tags[action.payload.srcIndex],
        id: generateTagId(),
        canBeRemoved: true,
      };
      dstTags.splice(action.payload.dstIndex, 0, newTag);

      return {
        ...queue,
        columns: queue.columns.map((column) => {
          const cardsIds = column.cards.map((card) => card.id);
          if (!cardsIds.includes(dstCard.id)) return column;
          return {
            ...column,
            cards: column.cards.map((card) => {
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
    case 'remove-card': {
      return {
        ...queue,
        columns: queue.columns.map((column) => {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== action.payload.cardId),
          };
        }),
      };
    }
    case 'remove-tag': {
      return {
        ...queue,
        columns: queue.columns.map((column) => {
          return {
            ...column,
            cards: column.cards.map((card) => {
              return {
                ...card,
                tags: card.tags.filter((tag) => tag.id !== action.payload.tagId),
              };
            }),
          };
        }),
      };
    }
    case 'reorder-cards': {
      const dstColumn = takeColumn(queue, action.payload.columnId);

      if (!dstColumn) return queue;

      const dstCards = [...dstColumn.cards];
      const [removed] = dstCards.splice(action.payload.srcIndex, 1);

      dstCards.splice(action.payload.dstIndex, 0, removed);

      return {
        ...queue,
        columns: queue.columns.map((column) => {
          if (column.id !== dstColumn.id) return column;
          return {
            ...column,
            cards: dstCards,
          };
        }),
      };
    }
    case 'reorder-tags': {
      const dstCard = takeCard(queue, action.payload.cardId);

      if (!dstCard) return queue;

      const dstTags = [...dstCard.tags];
      const [removed] = dstTags.splice(action.payload.srcIndex, 1);
      dstTags.splice(action.payload.dstIndex, 0, removed);

      return {
        ...queue,
        columns: queue.columns.map((column) => {
          const cardsIds = column.cards.map((card) => card.id);
          if (!cardsIds.includes(dstCard.id)) return column;
          return {
            ...column,
            cards: column.cards.map((card) => {
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
    case 'move-card-between-columns': {
      const srcColumn = takeColumn(queue, action.payload.srcColumnId);
      if (srcColumn === undefined) return queue;
      const dstColumn = takeColumn(queue, action.payload.dstColumnId);
      if (dstColumn === undefined) return queue;

      const srcCards = [...srcColumn.cards];
      const [removed] = srcCards.splice(action.payload.srcIndex, 1);

      const dstCards = [...dstColumn.cards];
      dstCards.splice(action.payload.dstIndex, 0, removed);

      return {
        ...queue,
        columns: queue.columns.map((column) => {
          if (column.id === srcColumn.id) return { ...column, cards: srcCards };
          if (column.id === dstColumn.id) return { ...column, cards: dstCards };
          return column;
        }),
      };
    }
    case 'move-tag-between-cards': {
      const srcCard = takeCard(queue, action.payload.srcCardId);
      if (srcCard === undefined) return queue;
      const dstCard = takeCard(queue, action.payload.dstCardId);
      if (dstCard === undefined) return queue;

      const srcTags = [...srcCard.tags];
      const [removed] = srcTags.splice(action.payload.srcIndex, 1);

      const dstTags = [...dstCard.tags];
      dstTags.splice(action.payload.dstIndex, 0, removed);

      return {
        ...queue,
        columns: queue.columns.map((column) => {
          return {
            ...column,
            cards: column.cards.map((card) => {
              if (card.id === srcCard.id) {
                return { ...card, tags: srcTags };
              }

              if (card.id === dstCard.id) {
                return { ...card, tags: dstTags };
              }

              return card;
            }),
          };
        }),
      };
    }
    case 'filter-tags': {
      return {
        ...queue,
        tags: allTags.filter((tag) => tag.label.includes(action.payload.tagLabel)),
      };
    }
    case 'toggle-freeze-status': {
      return {
        ...queue,
        isFrozen: !queue.isFrozen,
      };
    }
    default: {
      return queue;
    }
  }
};

const takeColumn = (queue: Queue, columnId: string) => {
  return queue.columns.find((column) => column.id === columnId);
};

const takeCard = (queue: Queue, cardId: Card['id']) => {
  return queue.columns.flatMap((column) => column.cards).find((card) => card.id === cardId);
};

export const takeQueueEntity = (id: string): QueueEntity | null => {
  const stringifiedTypes = Object.values(QueueEntity).map(String);
  const prefix = id.split('__').at(0) as QueueEntity;
  if (!stringifiedTypes.includes(prefix)) return null;
  return prefix as QueueEntity;
};
