import { React } from 'react';

function Scoreboard({player1Score, player2Score}) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                padding: '20px',
                color: 'black',
                fontWeight: 'bold',
                justifyContent: 'center'
            }}
        >
            <div style={{color:'black'}}> {player1Score} </div>
            <div>-</div>
            <div> {player2Score} </div>
        </div>
    );
}

export default Scoreboard;
