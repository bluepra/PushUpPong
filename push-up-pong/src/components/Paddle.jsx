import { React, useState } from 'react';

function Paddle({ x, y, height, width }) {

    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: 'black',
                borderRadius: '10px'
            }}
        ></div>
    );
}

export default Paddle;
