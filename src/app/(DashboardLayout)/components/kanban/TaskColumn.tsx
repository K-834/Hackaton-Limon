import React from 'react';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Array<{
    id: number;
    title: string;
    description: string;
    user: string;
  }>;
  onDrop: (taskId: number, columnId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ id, title, tasks, onDrop }) => {
  const drop = (event: React.DragEvent) => {
    event.preventDefault();
    const taskId = Number(event.dataTransfer.getData('task_id'));
    onDrop(taskId, id);
  };

  const dragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="task-column" id={id} onDrop={drop} onDragOver={dragOver}>
      <h3>{title}</h3>
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
