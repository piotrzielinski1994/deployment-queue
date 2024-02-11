import { Tag } from '@/data/tags/tags.types';
import { QueueEntity } from '../queue/queue.types';

export interface Card {
  id: `${QueueEntity.CARD}__${string}`;
  heading: string;
  tags: Tag[];
}
