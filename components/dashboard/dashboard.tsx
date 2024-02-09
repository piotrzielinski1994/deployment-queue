'use client';

import React from 'react';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import styles from './dashboard.module.scss';
import SidebarContainer from '@/components/sidebar/sidebar.container';
import BoardContainer from '@/components/board/board.container';
import withRuntime from '@/components/hoc/with-runtime/with-runtime';
import { useDashboard } from './dashboard.hooks';
import { takeAction } from './dashboard.helpers';
import { tags } from '@/data/tags';

export const Dashboard = () => {
  const [columns, dispatch] = useDashboard();

  const onDragEnd: OnDragEndResponder = (metadata) => {
    const action = takeAction(metadata);
    if (!action) return;
    dispatch(action);
  };

  return (
    <div className={styles.wrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        <SidebarContainer droppableId="ITEMS" tags={tags} />
        <BoardContainer columns={columns} dispatch={dispatch} />
      </DragDropContext>
    </div>
  );
};

export default withRuntime(Dashboard);
