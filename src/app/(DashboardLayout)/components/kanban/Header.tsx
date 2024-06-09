import React from 'react';

const Header: React.FC = () => {
return (
<header>
    <div className="logo">
    
    </div>
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
