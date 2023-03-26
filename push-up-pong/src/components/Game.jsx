import { React, useState, useEffect, useRef } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import Scoreboard from './Scoreboard';
import PlayerCamera from './PlayerCamera';
import { paddle, table, ball } from '../constants.js';
// import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import backgroundSound from './../music.mp3';
import paddleCollisionSound from './../paddleCollision.wav';
import goalSoundi from './../point_scored.wav';
import wallSoundi from './../ball_against_walls_top_and_bottom.wav';
import { useContext } from 'react';
import NoseYProportion from './contexts/NoseYProportion';

function Game(props) {
    function flipCoin() {
        return Math.random() > 0.5;
    }

    const navigate = useNavigate();

    const [ballPosition, setBallPosition] = useState({
        x: (table.width - ball.diameter) / 2 + 10,
        y: (table.height - ball.diameter) / 2,
    });

    const [ballVelocity, setBallVelocity] = useState({
        x: flipCoin() ? -5 : 5,
        y: flipCoin() ? -5 : 5,
    });

    const [noseYProp, setNoseYProp] = useContext(NoseYProportion);

    const [player1Position, setPlayer1Position] = useState(
        (table.height - paddle.height) / 2
    );

    const [player2Position, setPlayer2Position] = useState(
        (table.height - paddle.height) / 2
    );

    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

    // const paddleId = props.paddleId;
    // const roomId = props.roomId;

    const leftPaddleX = 30;
    const rightPaddleX = table.width - paddle.width - 30;

    const AI_SPEED = 0.5;

    const background = new Audio(backgroundSound);
    background.volume = 0.4;
    const paddleSound = new Audio(paddleCollisionSound);
    const wallSound = new Audio(wallSoundi);
    const goalSound = new Audio(goalSoundi);

    // useEffect(() => {
    //     background.play();
    // }, []);

    useEffect(() => {
        const winScore = 1;
        if (player1Score === winScore) {
            // background.pause();
            alert('You Win!');

            navigate('/');
        } else if (player2Score === winScore) {
            // background.pause();
            alert('The AI Wins!');

            navigate('/');
        }
    }, [player1Score, player2Score]);

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
        if (ballPosition.y <= 0) {
            if (ballVelocity.y < 0) {
                setBallVelocity((prevVelocity) => ({
                    x: prevVelocity.x,
                    y: -prevVelocity.y,
                }));
                wallSound.play();
            }
        } else if (ballPosition.y >= table.height - ball.diameter) {
            if (ballVelocity.y > 0) {
                setBallVelocity((prevVelocity) => ({
                    x: prevVelocity.x,
                    y: -prevVelocity.y,
                }));
                wallSound.play();
            }
        }

        // Check for goals
        if (ballPosition.x <= -20) {
            goalSound.play();
            setPlayer2Score((prevScore) => prevScore + 1);
            // playerScored('right');
            setBallPosition({ x: table.width / 2 + 10, y: 200 });
            setBallVelocity({ x: 5, y: 5 });
            return;
        } else if (ballPosition.x >= table.width) {
            goalSound.play();
            setPlayer1Score((prevScore) => prevScore + 1);
            // playerScored('left');
            setBallPosition({ x: table.width / 2 + 10, y: 200 });
            setBallVelocity({ x: 5, y: 5 });
            return;
        }

        // Check for collisions with paddles
        if (
            ballPosition.x <= leftPaddleX + paddle.width &&
            ballPosition.y >= player1Position &&
            ballPosition.y <= player1Position + paddle.height
        ) {
            if (ballVelocity.x < 0) {
                paddleSound.play();

                setBallVelocity((prevVelocity) => ({
                    x: -prevVelocity.x * 1.15,
                    y: prevVelocity.y * 1.15, // (ballPosition.y - (player1Position + 40)) / 10,
                }));
            }
        } else if (
            ballPosition.x + ball.diameter >= rightPaddleX &&
            ballPosition.y >= player2Position &&
            ballPosition.y <= player2Position + paddle.height
        ) {
            if (ballPosition.x > rightPaddleX + paddle.width) {
                console.log('behind paddle');
            } else {
                paddleSound.play();
                if (ballVelocity.x > 0) {
                    setBallVelocity((prevVelocity) => ({
                        x: -prevVelocity.x * 1.15,
                        y: prevVelocity.y * 1.15,
                    }));
                }
            }
        }
        // sendBallUpdate({ ballPosition, ballVelocity });
    }, [ballPosition, player1Position, player2Position]);

    useEffect(() => {
        const new_AI_position =
            player2Position +
            AI_SPEED * (ballPosition.y - player2Position) -
            50;
        setPlayer2Position(new_AI_position);
    }, [ballPosition]);

    useEffect(() => {
        console.log('Changed y-nose proportion to', noseYProp);
        const new_pos = Math.round(noseYProp * table.height);
        if (new_pos >= 0 && new_pos <= table.height - paddle.height) {
            setPlayer1Position(new_pos);
        }
    }, [noseYProp]);

    return (
        <>
            <div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <PlayerCamera marginLeft="40px"></PlayerCamera>

                    <Scoreboard
                        player1Score={player1Score}
                        player2Score={player2Score}
                    ></Scoreboard>
                    {/* <PlayerCamera
                        marginRight="40px"
                        display={false}
                    ></PlayerCamera> */}
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    tabIndex="0"
                    style={{
                        // border: '1px solid red',
                        position: 'relative',
                        width: table.width,
                        height: table.height,
                        backgroundColor: 'white',
                        userSelect: 'none',
                        outline: 'none',
                    }}
                >
                    <Ball x={ballPosition.x} y={ballPosition.y} />
                    <Paddle
                        x={leftPaddleX}
                        y={player1Position}
                        width={paddle.width}
                        height={paddle.height}
                    />
                    <Paddle
                        x={rightPaddleX}
                        y={player2Position}
                        width={paddle.width}
                        height={paddle.height}
                    />
                </div>
            </div>
        </>
    );
}

export default Game;
