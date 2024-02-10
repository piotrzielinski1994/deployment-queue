import { Card } from '@/data/cards/cards.types';

export interface Column {
  id: `column__${string}`;
  heading: string;
  canAddCard?: true;
  cards: Card[];
}
