'use client';

import React from 'react';
import { useQueue } from '@/data/queue/queue.hooks';
import { QueueProviderProps } from './queue.provider.types';
import { QueueManager } from '@/data/queue/queue.types';

export const QueueContext = React.createContext<QueueManager>({} as QueueManager);

const QueueProvider = ({ children }: QueueProviderProps) => {
  const queue = useQueue();
  return <QueueContext.Provider value={queue}>{children}</QueueContext.Provider>;
};

export default QueueProvider;
