import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';


const Logo = () => {
    return (
        <div className="ma3 m3">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 155 }} >
                <div className="Tilt-inner">
                    <img style={{ padding: '2px' }} alt='logo' src={brain} />
                </div>
            </Tilt>
        </div>

    )
}

export default Logo; 