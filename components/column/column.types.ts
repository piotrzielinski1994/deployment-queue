import { ColumnDispatcher } from '../dashboard/dashboard.types';
import { Column } from '@/data/columns/columns.types';

export interface ColumnProps {
  column: Column;
  dispatch: ColumnDispatcher;
}
