import { useReducer } from 'react';
import { defaultQueue, queueReducer } from './queue.helpers';

export const useQueue = () => {
  const [queue, dispatchQueue] = useReducer(queueReducer, defaultQueue);
  return { queue, dispatchQueue };
};
