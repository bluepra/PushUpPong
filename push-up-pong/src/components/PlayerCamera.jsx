import React from 'react';

function PlayerCamera(marginLeft = 0, marginRight = 0) {
    return (
        <div
            style={{
                width: '20vw',
                height: '20vh',
                backgroundColor: 'grey',
                borderRadius: '10px',
                margin: '10px',
            }}
        ></div>
    );
}

export default PlayerCamera;
