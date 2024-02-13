import Column from '@/components/column/column';
import styles from './board.module.scss';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';

const BoardContainer = () => {
  const { queue } = useQueue();
  const queueStatus = queue.isFrozen ? 'FROZEN' : 'ACTIVE';
  return (
    <div className={styles.wrapper} data-is-frozen={queue.isFrozen}>
      <h2 className={styles.queueStatus}>
        Queue status: <span>{queueStatus}</span>
      </h2>
      <div className={styles.columns}>
        {queue.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default BoardContainer;
