import React from 'react';

interface TaskCardProps {
task: {
id: number;
title: string;
description: string;
user: string;
};
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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
    <p>☒</p>
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
