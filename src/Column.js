import React from 'react';
import TaskForm from './TaskForm';

function Column(props) {
  const {
    column,
    tasks,
    onAddTask,
    onMoveTask,
    onDragOver,
    onDrop,
    onDragStart,
    onDragEnd,
  } = props;

  function handleAddTask(title, description) {
    onAddTask(title, description, column.id);
  }

  function handleMoveTask(taskId, sourceColumnId, destinationColumnId) {
    onMoveTask(taskId, sourceColumnId, destinationColumnId);
  }

  return (
    <div
      className="column"
      onDragOver={(event) => onDragOver(event, column.id)}
      onDrop={(event) => onDrop(event, column.id)}
    >
      <h2>{column.title}</h2>
      <div className="tasks">
        {props.children}
        <TaskForm onAddTask={handleAddTask} />
      </div>
    </div>
  );
}

export default Column;
