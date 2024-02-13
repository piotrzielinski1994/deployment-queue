import React from 'react';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';
import styles from './freeze-btn.module.scss';

const FreezeBtn = () => {
  const { queue, toggleFreezeStatus } = useQueue();
  const label = queue.isFrozen ? 'UNFREEZE' : 'FREEZE';
  return (
    <button className={styles.wrapper} onClick={toggleFreezeStatus}>
      {label}
    </button>
  );
};

export default FreezeBtn;
