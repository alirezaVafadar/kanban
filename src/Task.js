import React from 'react';

function Task(props) {
  const { task, onDragStart } = props;

  return (
    <div
      className="task"
      draggable="true"
      onDragStart={(event) => onDragStart(event, task.id)}
    >
      <div className="task-header">
        <h4>{task.title}</h4>
      </div>
      <div className="task-body">
        <p>{task.description}</p>
      </div>
    </div>
  );
}

export default Task;