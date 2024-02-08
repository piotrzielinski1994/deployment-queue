import { tags } from '@/data/tags';
import { DroppableProps } from '@hello-pangea/dnd';

export interface SidebarContainerProps {
  droppableId: DroppableProps['droppableId'];
  tags: typeof tags;
}
