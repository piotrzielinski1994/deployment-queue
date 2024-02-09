import { HTMLProps } from 'react';
import { ColumnDispatcher, IColumn } from '../dashboard/dashboard.types';

export interface ColumnProps extends HTMLProps<HTMLDivElement> {
  heading: string;
  addCard?: (event: any) => void;
}

export interface ColumnContainerProps {
  column: IColumn;
  dispatch: ColumnDispatcher;
}
