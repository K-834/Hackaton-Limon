import React from 'react';

interface TaskCardProps {
task: {
id: number;
title: string;
description: string;
user: string;
};
deleteTask: (taskId: number) => void; 
}

const TaskCard: React.FC<TaskCardProps> = ({ task, deleteTask}) => {
const dragStart = (event: React.DragEvent) => {
event.dataTransfer.setData('task_id', task.id.toString());
};

const dragOver = (event: React.DragEvent) => {
event.preventDefault();
};

return (
<div 
    className="task-container" 
    draggable 
    onDragStart={dragStart} 
    onDragOver={dragOver}
>
    <div className="task-header">
    <p>{task.title}</p>
    <button onClick={() => deleteTask(task.id)}>☒</button>
    </div>
    <div className="task-description-container">
    <p>{task.description}</p>
    </div>
    <div className="task-user-assigned">
    <p className="user-name">{task.user}</p>
    </div>
</div>
);
};

export default TaskCard;
