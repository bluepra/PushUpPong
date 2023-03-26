import { React } from 'react';

function Ball({ x, y }) {
    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'black',
            }}
        ></div>
    );
}

export default Ball;
