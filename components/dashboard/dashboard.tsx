'use client';

import Board from '@/components/board/board';
import withRuntime from '@/components/hoc/with-runtime/with-runtime';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';
import Sidebar from '@/components/sidebar/sidebar';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { takeQueueAction } from '../../data/queue/queue.helpers';
import styles from './dashboard.module.scss';

export const Dashboard = () => {
  const { dispatchQueue } = useQueue();
  const onDragEnd: OnDragEndResponder = (metadata) => {
    console.log('@@@ metadata | ', metadata);
    const action = takeQueueAction(metadata);
    if (!action) return;
    dispatchQueue(action);
  };

  return (
    <div className={styles.wrapper}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Sidebar />
        <Board />
      </DragDropContext>
    </div>
  );
};

export default withRuntime(Dashboard);
