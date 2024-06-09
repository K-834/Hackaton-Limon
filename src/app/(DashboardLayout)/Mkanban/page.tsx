'use client';
import { useState } from 'react';
import '@/app/(DashboardLayout)/components/kanban/estilosKanban.css';
// import '@/app/(DashboardLayout)/components/landingpage/jsKanban.js';
import Header from '../components/kanban/Header';
import Modal from '../components/kanban/Modal';
import TaskBoard from '../components/kanban/TaskBoard';

const App: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);
    return (
        <div className="App">
            <>
                <Header />
                <div className="app-container">
                    <TaskBoard toggleModal={toggleModal} />
                </div>
            </>
        </div>
    );
}

export default App;