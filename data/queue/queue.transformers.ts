import { DropResult } from '@hello-pangea/dnd';
import { QueueManagableConfig } from './queue.types';

export const toQueueManagableConfig = ({
  source,
  destination,
}: DropResult): QueueManagableConfig => {
  return {
    src: source,
    dst: destination,
  };
};
