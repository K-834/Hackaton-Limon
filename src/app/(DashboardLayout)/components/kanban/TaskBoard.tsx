import React, { useEffect, useState } from 'react';
import TaskColumn from './TaskColumn';
import Modal from './Modal';

interface Task {
    id: number;
    title: string;
    description: string;
    user: string;
    status: string;
}

// const initialTasks: Task[] = [
// {
// id: 0,
// title: 'Fix submit button',
// description: 'The submit button has stopped working since the last release.',
// user: 'Piero',
// status: 'backlog',
// },
// {
// id: 1,
// title: "Change text on T and C's",
// description: 'The terms and conditions need updating as per the business meeting.',
// user: 'Alanis',
// status: 'backlog',
// },
// {
// id: 2,
// title: 'Change banner picture',
// description: 'Marketing has requested a new banner to be added to the website.',
// user: 'Anthony',
// status: 'doing',
// }
// ];

interface TaskBoardProps {
    toggleModal: () => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ toggleModal }) => {

    // const [tasks, setTasks] = useState(initialTasks);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [proyectoId, setProyectoId] = useState<string | null>(null)

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setProyectoId(searchParams.get('projectId'));
        console.log(proyectoId);
        if (proyectoId) {
            console.log('Proyecto ID:', proyectoId);
            fetch(`http://143.110.156.21:8080/api/projects/all-task-project?projectId=${proyectoId}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const fetchedTasks = data.data.tasks.map((task: any) => ({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        user: task.asingee.fullname,
                        status: task.status === 0 ? 'backlog' : task.status === 1 ? 'doing' : 'done',
                    }));
                    setTasks(fetchedTasks);
                })
                .catch(error => console.error('Error fetching tasks:', error));
        } else {
            console.log('No se encontro ID');
        }

    }, [proyectoId]);


    const addTask = (title: string, description: string, user: string) => {
        const newTask = {
            id: tasks.length + 1,
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


    const deleteTask = async (taskId: number) => {
        // setTasks(tasks.filter(task => task.id !== taskId));
            try {
                const response = await fetch(`http://143.110.156.21:8080/api/projects/delete-task?taskId=${taskId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // actualiza el estado para reflejar que la tarea ha sido eliminada
                setTasks(tasks.filter(task => task.id !== taskId));
            } catch (error) {
                console.error('Ha habido un problema con la operación fetch:', error);
            }
    };

    return (
        <section className="column-container">
            <TaskColumn id="backlog" title="TO DO" tasks={tasks.filter(task => task.status === 'backlog')} onDrop={moveTask} deleteTask={deleteTask} />
            <TaskColumn id="doing" title="IN PROGRESS" tasks={tasks.filter(task => task.status === 'doing')} onDrop={moveTask} deleteTask={deleteTask} />
            <TaskColumn id="done" title="DONE" tasks={tasks.filter(task => task.status === 'done')} onDrop={moveTask} deleteTask={deleteTask} />
            <div className="button-add" onClick={toggleModalHandler}>
                <p>+</p>
            </div>
            {showModal && <Modal toggleModal={toggleModalHandler} addTask={addTask} proyectoId={proyectoId} />}
        </section>
    );
};

export default TaskBoard;

