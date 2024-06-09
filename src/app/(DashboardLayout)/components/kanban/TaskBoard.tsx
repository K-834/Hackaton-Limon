import React, { useState } from 'react';
import TaskColumn from './TaskColumn';
import Modal from './Modal';

interface Task {
id: number;
title: string;
description: string;
user: string;
status: string;
}

const initialTasks: Task[] = [
{
id: 0,
title: 'Fix submit button',
description: 'The submit button has stopped working since the last release.',
user: 'Piero',
status: 'backlog',
},
{
id: 1,
title: "Change text on T and C's",
description: 'The terms and conditions need updating as per the business meeting.',
user: 'Alanis',
status: 'backlog',
},
{
id: 2,
title: 'Change banner picture',
description: 'Marketing has requested a new banner to be added to the website.',
user: 'Anthony',
status: 'doing',
}
];

interface TaskBoardProps {
toggleModal: () => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ toggleModal }) => {
const [tasks, setTasks] = useState(initialTasks);

const addTask = (title: string, description: string, user: string) => {
const newTask = {
    id: tasks.length,
    title,
    description,
    user,
    status: 'backlog', 
};
setTasks([...tasks, newTask]);
};

const moveTask = (taskId: number, columnId: string) => {
setTasks(tasks.map(task => task.id === taskId ? { ...task, status: columnId } : task));
};
const [showModal, setShowModal] = useState(false);
const toggleModalHandler = () => setShowModal(!showModal);



return (
<section className="column-container">
    <TaskColumn id="backlog" title="TO DO" tasks={tasks.filter(task => task.status === 'backlog')} onDrop={moveTask} />
    <TaskColumn id="doing" title="IN PROGRESS" tasks={tasks.filter(task => task.status === 'doing')} onDrop={moveTask} />
    <TaskColumn id="done" title="DONE" tasks={tasks.filter(task => task.status === 'done')} onDrop={moveTask} />
    <div className="button-add" onClick={toggleModalHandler}>
    <p>+</p>
    </div>        
    {showModal && <Modal toggleModal={toggleModalHandler} addTask={addTask} />}
</section>
);
};

export default TaskBoard;