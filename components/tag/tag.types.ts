import { tags } from '@/data/tags';

export interface TagContainerProps {
  tag: (typeof tags)[0];
  index: number;
}
