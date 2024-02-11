import { QueueEntity } from '@/data/queue/queue.types';
import { v4 as uuid } from 'uuid';

export const generateId = <T extends QueueEntity>(prefix: T): `${T}__${string}` => {
  return `${prefix}__${uuid()}`;
};

export const generateColumnId = () => generateId(QueueEntity.COLUMN);
export const generateCardId = () => generateId(QueueEntity.CARD);
export const generateTagId = () => generateId(QueueEntity.TAG);
