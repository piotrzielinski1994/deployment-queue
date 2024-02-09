import { IColumn } from '@/components/dashboard/dashboard.types';
import { v4 as uuid } from 'uuid';

export const columns: IColumn[] = [
  {
    id: uuid(),
    heading: 'Deploying',
    cards: [],
  },
  {
    id: uuid(),
    heading: 'Waiting',
    cards: [],
    canAdd: true,
  },
];
