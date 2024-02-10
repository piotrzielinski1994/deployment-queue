import { DropResult } from '@hello-pangea/dnd';
import { QueueManagableConfig } from './queue.types';
import { DndDroppable } from '../dnd/dnd.types';

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
