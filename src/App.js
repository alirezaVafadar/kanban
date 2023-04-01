import React, { useState } from 'react';
import './App.css';
import { COLUMNS, INITIAL_TASKS } from './constants';
import Column from './Column';
import Task from './Task';
import TaskForm from './TaskForm';

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  function handleAddTask(title, description, columnId) {
    const newTask = {
      id: `task-${tasks.length + 1}`,
      title,
      description,
      column: columnId
    };
    setTasks([...tasks, newTask]);
  }

  function handleMoveTask(taskId, sourceColumnId, destinationColumnId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const updatedTask = { ...tasks[taskIndex], column: destinationColumnId };
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskIndex, 1, updatedTask);
    setTasks(updatedTasks);
  }

  function handleDragStart(event, task) {
    event.dataTransfer.setData('text/plain', task.id);
    event.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(event, columnId) {
    const taskId = event.dataTransfer.getData('text/plain');
    handleMoveTask(taskId, tasks.find(task => task.id === taskId).column, columnId);
  }

  return (
    <div className="container">
      <div className="board">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.column === column.id)}
            onAddTask={handleAddTask}
            onMoveTask={handleMoveTask}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, column.id)}
          >
            {tasks
              .filter((task) => task.column === column.id)
              .map((task) => (
                <div key={task.id} draggable onDragStart={(event) => handleDragStart(event, task)}>
                  <Task task={task} />
                </div>
              ))}
          </Column>
        ))}
      </div>

    </div>
  );
}

export default App;
