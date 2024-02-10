import { ColumnDispatcher, Columns } from '../dashboard/dashboard.types';

export interface BoardProps {
  columns: Columns;
  dispatch: ColumnDispatcher;
}
