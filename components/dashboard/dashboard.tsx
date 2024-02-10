'use client';

import Board from '@/components/board/board';
import withRuntime from '@/components/hoc/with-runtime/with-runtime';
import Sidebar from '@/components/sidebar/sidebar';
import { tags } from '@/data/tags/tags';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { takeAction } from './dashboard.helpers';
import { useDashboard } from './dashboard.hooks';
import styles from './dashboard.module.scss';

export const Dashboard = () => {
  const [columns, dispatch] = useDashboard();

  const onDragEnd: OnDragEndResponder = (metadata) => {
    console.log('@@@ metadata | ', metadata);
    return;
    const action = takeAction(metadata);
    if (!action) return;
    dispatch(action);
  };

  return (
    <div className={styles.wrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Sidebar droppableId="ITEMS" tags={tags} />
        <Board columns={columns} dispatch={dispatch} />
      </DragDropContext>
    </div>
  );
};

export default withRuntime(Dashboard);
