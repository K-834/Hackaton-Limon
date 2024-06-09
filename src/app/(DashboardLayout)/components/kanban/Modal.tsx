import React, { useState } from 'react';
interface ModalProps {
toggleModal: () => void;
addTask: (title: string, description: string, user: string) => void;
}

const Modal: React.FC<ModalProps> = ({ toggleModal, addTask }) => {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [user, setUser] = useState('');

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(title, description, user);
    toggleModal();
};

return (
    <>
    <div className="blackwall hidden">
    </div>
    <div className="modal-container">
    <div className="modal-add-task">
        <h1>DATOS DE ACTIVIDAD</h1>
        <input
        className="input-modal"
        id="input-modal-title"
        type="text"
        placeholder="Nombre de Actividad"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
        className="textarea-modal"
        id="textarea-modal-description"
        placeholder="Describe tu actividad"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
        className="usersList"
        id="select-modal"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        >
        <option value="Alvaro">Alvaro</option>
        <option value="Piero">Piero</option>
        <option value="Anthony">Anthony</option>
        <option value="Alanis">Alanis</option>
        <option value="Miguel">Miguel</option>
        <option value="Chris">Chris</option>
        </select>
        <button className="btn-submit" onClick={handleSubmit}>
        AGREGAR ACTIVIDAD
        </button>
    </div>
    </div>    
    </>
);
};

export default Modal;
