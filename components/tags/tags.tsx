import Tag from '@/components/tag/tag';
import { Droppable } from '@hello-pangea/dnd';
import styles from './tags.module.scss';
import { DndDroppable } from '@/data/dnd/dnd.types';
import { StaticDropZone } from '@/data/queue/queue.types';
import TagsFilter from '@/components/tags-filter/tags-filter';
import { useQueue } from '@/components/provider/queue/queue.provider.hooks';

const Tags = () => {
  const { queue } = useQueue();

  return (
    <div className={styles.wrapper}>
      <TagsFilter />

      <Droppable type={DndDroppable.TAGS} droppableId={StaticDropZone.TAGS} isDropDisabled={true}>
        {(provided, snapshot) => (
          <div
            className={styles.content}
            ref={provided.innerRef}
            data-is-dragging={snapshot.isDraggingOver}
          >
            {queue.tags.map((tag, index) => (
              <Tag key={tag.id} tag={tag} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Tags;
