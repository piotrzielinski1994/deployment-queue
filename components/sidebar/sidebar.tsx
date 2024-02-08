import React, { ForwardedRef, HTMLProps, forwardRef } from 'react';
import styles from './sidebar.module.scss';

const Sidebar = forwardRef(
  (props: HTMLProps<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
    return <div className={styles.wrapper} ref={ref} {...props} />;
  }
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
