import React, { ForwardedRef, HTMLProps, forwardRef } from 'react';
import styles from './card.module.scss';
import { CardProps } from './card.types';

const Card = forwardRef(({ heading, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
  const classNames = [styles.wrapper, props.className].filter(Boolean).join(' ');
  return (
    <div {...props} className={classNames}>
      <h3 className={styles.heading}>{heading}</h3>
      {/* <svg width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
        />
      </svg> */}
      <div className={styles.content} ref={ref} {...props}>
        {props.children}
      </div>
    </div>
  );
});

Card.displayName = 'Tag';

export default Card;
