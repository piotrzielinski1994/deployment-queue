'use client';

import Board from '@/components/board/board';
import withRuntime from '@/components/hoc/with-runtime/with-runtime';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';
import Sidebar from '@/components/sidebar/sidebar';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import styles from './dashboard.module.scss';
import { toQueueManagableConfig } from '@/data/queue/queue.transformers';

export const Dashboard = () => {
  const { manageQueue } = useQueue();
  const onDragEnd: OnDragEndResponder = (metadata) => {
    console.log('@@@ metadata | ', metadata);
    const config = toQueueManagableConfig(metadata);
    manageQueue(config);
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
