import Tag from '@/components/tag/tag';
import { Droppable } from '@hello-pangea/dnd';
import styles from './tags.module.scss';
import { DndDroppable } from '@/data/dnd/dnd.types';
import { tags } from '@/data/tags/tags';
import { StaticDropZone } from '@/data/queue/queue.types';

const Tags = () => {
  return (
    <Droppable type={DndDroppable.TAGS} droppableId={StaticDropZone.TAGS} isDropDisabled={true}>
      {(provided, snapshot) => (
        <div
          className={styles.wrapper}
          ref={provided.innerRef}
          data-is-dragging={snapshot.isDraggingOver}
        >
          {tags.map((tag, index) => (
            <Tag key={tag.id} tag={tag} index={index} />
          ))}
        </div>
      )}
    </Droppable>
  );
};

export default Tags;
