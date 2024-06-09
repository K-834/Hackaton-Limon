import { useState, useEffect } from 'react';

interface ModalProps {
    toggleModal: () => void;
    addTask: (title: string, description: string, user: string) => void;
    proyectoId: string | null;
}

interface Member {
    studentCode: string;
    fullname: string;
}

const Modal: React.FC<ModalProps> = ({ toggleModal, addTask, proyectoId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedUser, setSelectedUser] = useState<Member | null>(null);
    const [members, setMembers] = useState<Member[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedUser) {
            console.error("No user selected");
            return;
        }

        const response = await fetch(
            "http://143.110.156.21:8080/api/projects/create-new-task",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: proyectoId,
                    title: title,
                    description: description,
                    studentCode: selectedUser.studentCode,
                }),
            }
        );
console.log('response', selectedUser.studentCode)   ;
        if (response.ok) {
            addTask(title, description, selectedUser.fullname);
            toggleModal();
        } else {
            console.error("Error:", response.status, response.statusText);
        }
    };

    useEffect(() => {
        const storedMembers = localStorage.getItem('miembros');
        if (storedMembers) {
            setMembers(JSON.parse(storedMembers));
        }
    }, []);

    return (
        <>
            <div className="blackwall hidden"></div>
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
                        value={selectedUser ? selectedUser.fullname : ''}
                        onChange={(e) => {
                            const selectedFullname = e.target.value;
                            const selectedMember = members.find(member => member.fullname === selectedFullname);
                            setSelectedUser(selectedMember || null);
                        }}
                    >
                        {members.map((member) => (
                            <option key={member.studentCode} value={member.fullname}>
                                {member.fullname}
                            </option>
                        ))}
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
