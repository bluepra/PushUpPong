import React from 'react';

const Ball = ({ x, y, size }) => {
    const style = {
        position: 'absolute',
        top: y,
        left: x,
        height: size,
        width: size,
        borderRadius: '50%',
        backgroundColor: 'white',
    };

    return <div style={style}></div>;
};

export default Ball;
