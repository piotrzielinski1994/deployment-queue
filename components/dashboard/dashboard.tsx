'use client';

import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext } from '@hello-pangea/dnd';
import { tags } from '@/data/tags';
import { columns } from '@/data/columns';
import styles from './dashboard.module.scss';
import SidebarContainer from '@/components/sidebar/sidebar.container';
import BoardContainer from '@/components/board/board.container';
import withRuntime from '@/components/hoc/with-runtime/with-runtime';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log('@@@ reorder | ', result);

  return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });

  console.log('@@@ copy | ', destClone);

  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  console.log('@@@ move | ', result);

  return result;
};

class Dashboard extends Component {
  state = columns.reduce(
    (acc, column) => ({
      ...acc,
      [column]: [],
    }),
    {}
  );

  onDragEnd = (result) => {
    const { source, destination } = result;

    console.log('@@@ result', result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
          ),
        });
        break;
      case 'ITEMS':
        const asd = {
          [destination.droppableId]: copy(
            tags,
            this.state[destination.droppableId],
            source,
            destination
          ),
        };
        console.log('@@@ asd | ', asd);
        this.setState(asd);
        break;
      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };

  render() {
    console.log('@@@ state 2 | ', this.state);
    return (
      <div className={styles.wrapper}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <SidebarContainer droppableId="ITEMS" tags={tags} />
          <BoardContainer columns={this.state} />
        </DragDropContext>
      </div>
    );
  }
}

export default withRuntime(Dashboard);
