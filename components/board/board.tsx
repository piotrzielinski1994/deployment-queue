import Column from '@/components/column/column';
import styles from './board.module.scss';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';

const BoardContainer = () => {
  const { queue } = useQueue();
  return (
    <div className={styles.wrapper}>
      {Object.entries(queue).map(([id, column]) => (
        <Column key={id} column={column} />
      ))}
    </div>
  );
};

export default BoardContainer;
