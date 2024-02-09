import { tags } from '@/data/tags';
import { DropResult } from '@hello-pangea/dnd';
import { Dispatch } from 'react';

export type Columns = Record<string, typeof tags>;
export type ColumnDispatcher = Dispatch<Action>;

export type Action = ActionReorderColumnItens | ActionCopyToColumn | ActionMoveBetweenColumns;

interface ActionReorderColumnItens {
  type: 'reorder';
  payload: DropResult;
}

interface ActionCopyToColumn {
  type: 'copy';
  payload: DropResult;
}

interface ActionMoveBetweenColumns {
  type: 'move';
  payload: DropResult;
}
