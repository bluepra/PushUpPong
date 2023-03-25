import { React, useState } from 'react';
function Scoreboard(props) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px',
                color: 'white',
                fontWeight: 'bold',
            }}
        >
            <div>Player 1: {props.player1Score}</div>
            <div>Player 2: {props.player2Score}</div>
        </div>
    );
}

export default Scoreboard;
