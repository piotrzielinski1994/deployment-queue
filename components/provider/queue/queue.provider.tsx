'use client';

import React, { useCallback, useMemo } from 'react';
import { useQueue } from '@/data/queue/queue.hooks';
import { QueueProviderProps } from './queue.provider.types';
import { QueueManager } from '@/data/queue/queue.types';
import { takeQueueAction } from '@/data/queue/queue.helpers';

export const QueueContext = React.createContext<QueueManager>({} as QueueManager);

const QueueProvider = ({ children }: QueueProviderProps) => {
  const { queue, dispatchQueue } = useQueue();

  const manageQueue: QueueManager['manageQueue'] = useCallback(
    (data) => {
      console.log('@@@ data | ', data);
      const action = takeQueueAction(data);
      console.log('@@@ action | ', action);
      if (!action) return;
      dispatchQueue(action);
    },
    [dispatchQueue],
  );

  const addCard: QueueManager['addCard'] = useCallback(
    (card, columnId) => {
      dispatchQueue({
        type: 'insert',
        payload: {
          card,
          dst: {
            droppableType: 'column',
            droppableId: columnId,
            index: -1,
          },
        },
      });
    },
    [dispatchQueue],
  );

  const state = useMemo(() => {
    return {
      queue,
      manageQueue,
      addCard,
    };
  }, [queue, manageQueue, addCard]);

  return <QueueContext.Provider value={state}>{children}</QueueContext.Provider>;
};

export default QueueProvider;
