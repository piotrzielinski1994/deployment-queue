import { v4 as uuid } from 'uuid';
import { tags } from '@/data/tags';
import { Action, Columns } from './dashboard.types';
import { columns } from '@/data/columns';
import { DropResult, DroppableProps } from '@hello-pangea/dnd';

export const defaultColumns: Columns = {
  ...columns.reduce(
    (acc, column) => ({
      ...acc,
      [column]: [],
    }),
    {}
  ),
  ITEMS: tags,
};

export const columnsReducer = (state: Columns, action: Action) => {
  // TODO: Remove mutations
  switch (action.type) {
    case 'reorder': {
      const result = Array.from(state[action.payload.source.droppableId]);
      const [removed] = result.splice(action.payload.source.index, 1);
      result.splice(action.payload.destination!.index, 0, removed);

      return {
        ...state,
        [action.payload.source.droppableId]: result,
      };
    }
    case 'copy': {
      const sourceClone = Array.from(state[action.payload.source.droppableId]);
      const destClone = Array.from(state[action.payload.destination!.droppableId]);
      const item = sourceClone[action.payload.source.index];

      destClone.splice(action.payload.destination!.index, 0, { ...item, id: uuid() });

      return {
        ...state,
        [action.payload.destination!.droppableId]: destClone,
      };
    }
    case 'move': {
      const sourceClone = Array.from(state[action.payload.source.droppableId]);
      const destClone = Array.from(state[action.payload.destination!.droppableId]);
      const [removed] = sourceClone.splice(action.payload.source.index, 1);

      destClone.splice(action.payload.destination!.index, 0, removed);

      return {
        ...state,
        [action.payload.source.droppableId]: sourceClone,
        [action.payload.destination!.droppableId]: destClone,
      };
    }
    default: {
      return state;
    }
  }
};

export const takeActionType = (
  source: DroppableProps['droppableId'],
  destination: DroppableProps['droppableId']
): Action['type'] => {
  switch (source) {
    case destination:
      return 'reorder';
    case 'ITEMS':
      return 'copy';
    default:
      return 'move';
  }
};

export const takeAction = (metadata: DropResult): Action | undefined => {
  if (!metadata.destination?.droppableId) {
    return;
  }

  const actionType = takeActionType(metadata.source.droppableId, metadata.destination.droppableId);

  return {
    type: actionType,
    payload: metadata,
  };
};
