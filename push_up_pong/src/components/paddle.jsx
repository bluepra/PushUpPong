import React from 'react';

const Paddle = ({ x, y, height, width }) => {
    const style = {
        position: 'absolute',
        top: y,
        left: x,
        height,
        width,
        backgroundColor: 'white',
    };

    return <div style={style}></div>;
};

export default Paddle;
