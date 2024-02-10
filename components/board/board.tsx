import Column from '@/components/column/column';
import styles from './board.module.scss';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';

const BoardContainer = () => {
  const { queue } = useQueue();
  return (
    <div className={styles.wrapper}>
      {queue.columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default BoardContainer;
