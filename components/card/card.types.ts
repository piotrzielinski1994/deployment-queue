import { HTMLProps } from 'react';
import { ICard } from '../dashboard/dashboard.types';

export interface CardProps extends HTMLProps<HTMLDivElement> {
  heading: string;
}

export interface CardContainerProps {
  card: ICard;
  index: number;
}
