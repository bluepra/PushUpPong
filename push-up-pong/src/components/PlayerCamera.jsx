import React from 'react';
import UserCamera from './UserCamera';

function PlayerCamera() {
    return (
        <div
            style={{
                width: '20vw',
                height: '20vh',
                backgroundColor: 'grey',
                borderRadius: '10px',
                margin: '10px',
                position: 'relative',
            }}
        >
            <UserCamera></UserCamera>
        </div>
    );
}

export default PlayerCamera;
