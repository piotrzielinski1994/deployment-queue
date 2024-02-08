import { tags } from '@/data/tags';
import { HTMLProps } from 'react';

export interface BoardProps extends HTMLProps<HTMLDivElement> {}

export interface BoardContainerProps extends BoardProps {
  columns: Record<string, typeof tags>;
}
