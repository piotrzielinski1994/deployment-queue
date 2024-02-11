import { QueueEntity } from '../queue/queue.types';

export interface Tag {
  id: `${QueueEntity.TAG}__${string}`;
  label: string;
  bgColor: `hsl(${number}, ${number}%, ${number}%)`;
  canBeRemoved?: true;
}
