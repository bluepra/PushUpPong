import { React, useState, useEffect } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import Scoreboard from './Scoreboard';
import PlayerCamera from './PlayerCamera';

function Game() {
    const [ballPosition, setBallPosition] = useState({ x: 300, y: 200 });
    const [ballVelocity, setBallVelocity] = useState({ x: 5, y: 5 });

    const [player1Position, setPlayer1Position] = useState(150);
    const [player2Position, setPlayer2Position] = useState(150);

    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);


    const paddle = {
        width: 20,
        height: 120
    }
    
    const table = {
        width: window.innerWidth,
        height: window.innerHeight * 0.8
    }


    useEffect(() => {
        // Move the ball every 16ms (60fps)
        const intervalId = setInterval(() => {
            setBallPosition((prevPosition) => ({
                x: prevPosition.x + ballVelocity.x,
                y: prevPosition.y + ballVelocity.y,
            }));
        }, 16);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [ballVelocity]);

    useEffect(() => {
        // Check for collisions with walls
        if (ballPosition.y <= 0 || ballPosition.y >= table.height - 20) {
            setBallVelocity((prevVelocity) => ({
                x: prevVelocity.x,
                y: -prevVelocity.y,
            }));
        }

        // Check for collisions with paddles
        if (
            ballPosition.x <= 35 &&
            ballPosition.y >= player1Position &&
            ballPosition.y <= player1Position + 80
        ) {
            setBallVelocity((prevVelocity) => ({
                x: -prevVelocity.x,
                y: (ballPosition.y - (player1Position + 40)) / 10,
            }));
        } else if (
            ballPosition.x >= table.width - 55 &&
            ballPosition.y >= player2Position &&
            ballPosition.y <= player2Position + 80
        ) {
            setBallVelocity((prevVelocity) => ({
                x: -prevVelocity.x,
                y: (ballPosition.y - (player2Position + 40)) / 10,
            }));
        }

        // Check for goals
        if (ballPosition.x <= -20) {
            setPlayer2Score((prevScore) => prevScore + 1);
            setBallPosition({ x: table.width / 2 + 10, y: 200 });
            setBallVelocity({ x: 5, y: 5 });
        } else if (ballPosition.x >= table.width) {
            setPlayer1Score((prevScore) => prevScore + 1);
            setBallPosition({ x: 300, y: 200 });
            setBallVelocity({ x: 5, y: 5 });
        }
    }, [ballPosition, player1Position, player2Position]);

    const handleKeyDown = (e) => {
        // Move player paddles up or down on key press
        console.log(window.innerHeight * 0.2)
        if (e.key === 'w') {
            setPlayer1Position(Math.max(player1Position - 20, 0));
        } else if (e.key === 's') {
            setPlayer1Position(Math.min(player1Position + 20, table.height - paddle.height))
        } else if (e.key === 'ArrowUp') {
            setPlayer2Position(Math.max(player2Position - 20, 0));
        } else if (e.key === 'ArrowDown') {
            setPlayer2Position(Math.min(player2Position + 20, table.height - paddle.height))
        }
    };

    return (
        <>
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <PlayerCamera></PlayerCamera>
                <Scoreboard player1Score={player1Score} player2Score={player2Score}></Scoreboard>
                <PlayerCamera></PlayerCamera>
            </div>
        </div>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div
                onKeyDown={handleKeyDown}
                tabIndex="0"
                style={{
                    // border: '1px solid black',
                    position: 'relative',
                    width: table.width,
                    height: table.height,
                    backgroundColor: 'white',
                    userSelect: 'none',
                    outline: 'none'
                }}
            >
                <Ball x={ballPosition.x} y={ballPosition.y} />
                <Paddle x={20} y={player1Position} width={paddle.width} height={paddle.height} />
                <Paddle x={table.width - 40} y={player2Position} width={paddle.width} height={paddle.height}/>
            </div>
        </div>
        </>
    );
}

export default Game;
