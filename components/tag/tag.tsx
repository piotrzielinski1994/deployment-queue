import React, { ForwardedRef, HTMLProps, forwardRef } from 'react';
import styles from './tag.module.scss';

const Tag = forwardRef((props: HTMLProps<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
  const classNames = [styles.wrapper, props.className].filter(Boolean).join(' ');
  return (
    <div ref={ref} {...props} className={classNames}>
      {/* <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
        />
      </svg> */}
      {props.children}
    </div>
  );
});

Tag.displayName = 'Tag';

export default Tag;
