import { React, useState } from 'react';
function Paddle({ x, y }) {
    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: '10px',
                height: '80px',
                backgroundColor: 'white',
            }}
        ></div>
    );
}

export default Paddle;
