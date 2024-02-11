import { Card } from '@/data/cards/cards.types';
import { QueueEntity } from '../queue/queue.types';

export interface Column {
  id: `${QueueEntity.COLUMN}__${string}`;
  heading: string;
  canAddCard?: true;
  cards: Card[];
}
