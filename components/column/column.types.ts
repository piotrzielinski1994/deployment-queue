import { tags } from '@/data/tags';
import { DroppableProps } from '@hello-pangea/dnd';
import { HTMLProps } from 'react';

export interface ColumnProps extends HTMLProps<HTMLDivElement> {
  heading: string;
}

export interface ColumnContainerProps extends ColumnProps {
  droppableId: DroppableProps['droppableId'];
  items: typeof tags;
}
