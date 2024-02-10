import { Tag } from '@/data/tags/tags.types';

export interface Card {
  id: `card__${string}`;
  heading: string;
  tags: Tag[];
}
