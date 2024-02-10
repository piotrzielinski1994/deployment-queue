import Column from '@/components/column/column';
import styles from './board.module.scss';
import { BoardProps } from './board.types';

const BoardContainer = ({ columns, dispatch }: BoardProps) => {
  return (
    <div className={styles.wrapper}>
      {Object.entries(columns).map(([id, column]) => (
        <Column key={id} column={column} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default BoardContainer;
