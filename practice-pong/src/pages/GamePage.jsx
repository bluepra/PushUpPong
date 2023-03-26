import React from 'react';
import Game from '../components/Game';
import PlayerCamera from '../components/PlayerCamera';
import Scoreboard from '../components/Scoreboard';

function GamePage(props) {
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around'
            }}>
                <PlayerCamera></PlayerCamera>
                <Scoreboard></Scoreboard>
                <PlayerCamera></PlayerCamera>
            </div>
            <div>
                <Game></Game>
            </div>
        </div>
    );
}

export default GamePage;