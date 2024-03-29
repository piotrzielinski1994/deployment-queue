'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useQueue } from '@/data/queue/queue.hooks';
import { QueueProviderProps } from './queue.provider.types';
import { QueueEntity, QueueManager } from '@/data/queue/queue.types';
import { takeQueueEntity } from '@/data/queue/queue.helpers';
import { toQueueAction } from '@/data/queue/queue.transformers';

export const QueueContext = React.createContext<QueueManager>({} as QueueManager);

const QueueProvider = ({ children }: QueueProviderProps) => {
  const { queue, dispatchQueue } = useQueue();
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnd: QueueManager['onDragEnd'] = useCallback(
    (metadata) => {
      setIsDragging(false);
      const action = toQueueAction(metadata);
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
  }, []);

  const addCard: QueueManager['addCard'] = useCallback(
    (card, columnId) => {
      dispatchQueue({
        type: 'add-card',
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

  const removeCard: QueueManager['removeCard'] = useCallback(
    (cardId) => {
      dispatchQueue({ type: 'remove-card', payload: { cardId } });
    },
    [dispatchQueue],
  );

  const removeTag: QueueManager['removeTag'] = useCallback(
    (tagId) => {
      dispatchQueue({ type: 'remove-tag', payload: { tagId } });
    },
    [dispatchQueue],
  );

  const filterTags: QueueManager['filterTags'] = useCallback(
    (tagLabel) => {
      dispatchQueue({ type: 'filter-tags', payload: { tagLabel } });
    },
    [dispatchQueue],
  );

  const toggleFreezeStatus: QueueManager['toggleFreezeStatus'] = useCallback(() => {
    dispatchQueue({ type: 'toggle-freeze-status' });
  }, [dispatchQueue]);

  const state = useMemo(() => {
    return {
      queue,
      isDragging,
      onDragStart,
      onDragEnd,
      addCard,
      removeCard,
      removeTag,
      filterTags,
      toggleFreezeStatus,
    };
  }, [
    queue,
    isDragging,
    onDragStart,
    onDragEnd,
    addCard,
    removeCard,
    removeTag,
    filterTags,
    toggleFreezeStatus,
  ]);

  return <QueueContext.Provider value={state}>{children}</QueueContext.Provider>;
};

export default QueueProvider;
