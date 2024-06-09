import { Button } from '@mui/material';
import React from 'react';

const Header: React.FC = () => {


    const handleNavigate = () => {
        const storedRequestBody = localStorage.getItem('requestBody');
        let url = '/proyectos?';
        if (storedRequestBody) {
            const requestBody = JSON.parse(storedRequestBody);
            let params = new URLSearchParams();

            for (let key in requestBody) {
                if (requestBody.hasOwnProperty(key)) {
                    params.append(key, requestBody[key]);
                }
            }

            url += params.toString();
        }
        
        // Navigate to the constructed URL
        window.location.href = url;
    };

    return (
        <header>
            <Button variant="contained" onClick={handleNavigate}>
            Volver
            </Button>
            <div className="proyects-container">
                <div className="proyect-button selected">
                    <h2>TA 1</h2>
                </div>
                <div className="proyect-button desactivado">
                    <h2>TA 2</h2>
                </div>
                <div className="proyect-button desactivado">
                    <h2>TA 3</h2>
                </div>
                <div className="proyect-button desactivado">
                    <h2>TA 4</h2>
                </div>
                <div className="proyect-button desactivado">
                    <h2>TF</h2>
                </div>
            </div>
            <div className="user-container desactivado">
                <div className="info">

                </div>
                <div className="icon">

                </div>
            </div>
        </header>
    );
};

export default Header;
