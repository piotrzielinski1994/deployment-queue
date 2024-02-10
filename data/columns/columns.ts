import { generateColumnId } from '@/utils/id';
import { Column } from './columns.types';

export const columns: Column[] = [
  {
    id: generateColumnId(),
    heading: 'Deploying',
    cards: [],
  },
  {
    id: generateColumnId(),
    heading: 'Waiting',
    cards: [],
    canAddCard: true,
  },
];
