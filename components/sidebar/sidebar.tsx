import Tag from '@/components/tag/tag';
import { Droppable } from '@hello-pangea/dnd';
import styles from './sidebar.module.scss';
import { DndDroppable } from '@/data/dnd/dnd.types';
import { tags } from '@/data/tags/tags';
import { TAG_CONTAINER } from '@/data/tags/tags.types';

const SidebarContainer = () => {
  return (
    <Droppable type={DndDroppable.TAGS} droppableId={TAG_CONTAINER} isDropDisabled={true}>
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

export default SidebarContainer;
