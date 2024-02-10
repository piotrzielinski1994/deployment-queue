'use client';

import React from 'react';
import { useQueue } from '@/data/queue/queue.hooks';
import { QueueProviderProps } from './queue.provider.types';
import { Queue } from '@/data/queue/queue.types';

export const QueueContext = React.createContext<Queue>({} as Queue);

const QueueProvider = ({ children }: QueueProviderProps) => {
  const queue = useQueue();
  return <QueueContext.Provider value={queue}>{children}</QueueContext.Provider>;
};

export default QueueProvider;
