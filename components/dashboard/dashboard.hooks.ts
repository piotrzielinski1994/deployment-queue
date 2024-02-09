import { useReducer } from 'react';
import { columnsReducer, defaultColumns } from './dashboard.helpers';
import { ColumnDispatcher, Columns } from './dashboard.types';

export const useDashboard = (): [Columns, ColumnDispatcher] => {
  return useReducer(columnsReducer, defaultColumns);
};
