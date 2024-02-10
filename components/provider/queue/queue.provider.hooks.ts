import { useContext } from 'react';
import { QueueContext } from './queue.provider';

export const useQueue = () => {
  return useContext(QueueContext);
};
