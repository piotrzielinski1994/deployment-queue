'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useQueue } from '@/data/queue/queue.hooks';
import { QueueProviderProps } from './queue.provider.types';
import { QueueEntity, QueueManager } from '@/data/queue/queue.types';
import { takeQueueAction, takeQueueEntity } from '@/data/queue/queue.helpers';
import { BeforeCapture } from '@hello-pangea/dnd';

export const QueueContext = React.createContext<QueueManager>({} as QueueManager);

const QueueProvider = ({ children }: QueueProviderProps) => {
  const { queue, dispatchQueue } = useQueue();
  const [isDragging, setIsDragging] = useState(false);

  const manageQueue: QueueManager['manageQueue'] = useCallback(
    (data) => {
      setIsDragging(false);
      console.log('@@@ data | ', data);
      const action = takeQueueAction(data);
      console.log('@@@ action | ', action);
      if (!action) return;
      dispatchQueue(action);
    },
    [dispatchQueue],
  );

  const onDragStart: QueueManager['onDragStart'] = useCallback((metadata) => {
    const queueEntity = takeQueueEntity(metadata.draggableId);
    if (!queueEntity) return;
    if ([QueueEntity.COLUMN].includes(queueEntity)) return;
    setIsDragging(true);
    console.log('@@@ metadata | ', metadata);
  }, []);

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
      isDragging,
      manageQueue,
      onDragStart,
      addCard,
    };
  }, [queue, isDragging, manageQueue, onDragStart, addCard]);

  return <QueueContext.Provider value={state}>{children}</QueueContext.Provider>;
};

export default QueueProvider;
