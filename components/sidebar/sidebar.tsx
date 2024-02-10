import Tag from '@/components/tag/tag';
import { Droppable } from '@hello-pangea/dnd';
import styles from './sidebar.module.scss';
import { SidebarContainerProps } from './sidebar.types';

const SidebarContainer = ({ droppableId, tags }: SidebarContainerProps) => {
  return (
    <Droppable type="tags" droppableId={droppableId} isDropDisabled={true}>
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
