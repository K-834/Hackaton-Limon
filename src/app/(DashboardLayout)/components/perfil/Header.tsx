import React, { FC } from 'react';

const Header: FC = () => {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '50em',
            marginBottom: '1rem',
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <img src="/images/logos/dark-logo.svg" alt=" " style={{width: '10em', marginRight: '1em'}}/>
                {/* <span style={{
                    fontWeight: 'bold',
                    fontSize: '1.125rem'
                }}>+ SQUAD</span> */}
            </div>
        </header>
    );
}

export default Header;