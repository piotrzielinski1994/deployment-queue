import { CardContainerProps } from '@/components/card/card.types';

export interface Column {
  id: `column__${string}`;
  heading: string;
  canAdd?: true;
  cards: CardContainerProps[];
}
