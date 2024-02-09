import { HTMLProps } from 'react';
import { ColumnDispatcher, Columns } from '../dashboard/dashboard.types';

export interface BoardProps extends HTMLProps<HTMLDivElement> {}

export interface BoardContainerProps extends BoardProps {
  columns: Columns;
  dispatch: ColumnDispatcher;
}
