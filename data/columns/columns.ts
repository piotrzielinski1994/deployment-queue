import { generateColumnId } from '@/utils/helpers/ids.helpers';
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
