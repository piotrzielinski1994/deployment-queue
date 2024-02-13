import React from 'react';
import styles from './tags-filter.module.scss';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';

const TagsFilter = () => {
  const { filterTags } = useQueue();

  const onInput = (event: any) => {
    filterTags(event.target.value);
  };

  return (
    <input
      className={styles.wrapper}
      onInput={onInput}
      type="text"
      name="tag"
      placeholder="Type tag name"
    />
  );
};

export default TagsFilter;
