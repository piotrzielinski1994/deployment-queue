import FreezeBtn from '@/components/freeze-btn/freeze-btn';
import Tags from '@/components/tags/tags';
import styles from './sidebar.module.scss';

const SidebarContainer = () => {
  return (
    <aside className={styles.wrapper}>
      <FreezeBtn />
      <hr className={styles.separator} />
      <Tags />
    </aside>
  );
};

export default SidebarContainer;
