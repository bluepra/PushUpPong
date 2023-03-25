import { React, useState, useEffect } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import Scoreboard from './Scoreboard';

function Game() {
    const [ballPosition, setBallPosition] = useState({ x: 300, y: 200 });
    const [ballVelocity, setBallVelocity] = useState({ x: 5, y: 5 });

    const [player1Position, setPlayer1Position] = useState(150);
    const [player2Position, setPlayer2Position] = useState(150);

    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

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
        if (ballPosition.y <= 0 || ballPosition.y >= 380) {
            setBallVelocity((prevVelocity) => ({
                x: prevVelocity.x,
                y: -prevVelocity.y,
            }));
        }

        // Check for collisions with paddles
        if (
            ballPosition.x <= 20 &&
            ballPosition.y >= player1Position &&
            ballPosition.y <= player1Position + 80
        ) {
            setBallVelocity((prevVelocity) => ({
                x: -prevVelocity.x,
                y: (ballPosition.y - (player1Position + 40)) / 10,
            }));
        } else if (
            ballPosition.x >= 580 &&
            ballPosition.y >= player2Position &&
            ballPosition.y <= player2Position + 80
        ) {
            setBallVelocity((prevVelocity) => ({
                x: -prevVelocity.x,
                y: (ballPosition.y - (player2Position + 40)) / 10,
            }));
        }

        // Check for goals
        if (ballPosition.x <= 0) {
            setPlayer2Score((prevScore) => prevScore + 1);
            setBallPosition({ x: 300, y: 200 });
            setBallVelocity({ x: 5, y: 5 });
        } else if (ballPosition.x >= 600) {
            setPlayer1Score((prevScore) => prevScore + 1);
            setBallPosition({ x: 300, y: 200 });
            setBallVelocity({ x: 5, y: 5 });
        }
    }, [ballPosition, player1Position, player2Position]);

    const handleKeyDown = (e) => {
        // Move player paddles up or down on key press
        if (e.key === 'w') {
            setPlayer1Position(player1Position - 20);
        } else if (e.key === 's') {
            setPlayer1Position(player1Position + 20);
        } else if (e.key === 'ArrowUp') {
            setPlayer2Position(player2Position - 20);
        } else if (e.key === 'ArrowDown') {
            setPlayer2Position(player2Position + 20);
        }
    };

    return (
        <div
            onKeyDown={handleKeyDown}
            tabIndex="0"
            style={{
                position: 'relative',
                width: '600px',
                height: '400px',
                backgroundColor: 'blue',
            }}
        >
            <Ball x={ballPosition.x} y={ballPosition.y} />
            <Paddle x={20} y={player1Position} />
            <Paddle x={580} y={player2Position} />
            <Scoreboard
                player1Score={player1Score}
                player2Score={player2Score}
            />
        </div>
    );
}

export default Game;
