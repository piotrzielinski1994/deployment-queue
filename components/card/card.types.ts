import { Card } from '@/data/cards/cards.types';
import { HTMLProps } from 'react';

export interface CardProps {
  card: Card;
  index: number;
  nativeProps?: HTMLProps<HTMLDivElement> & Record<`data-${string}`, any>;
}
