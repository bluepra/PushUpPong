import { React, useState, useEffect, useRef } from 'react';
import Paddle from './Paddle';
import Ball from './Ball';
import Scoreboard from './Scoreboard';
import PlayerCamera from './PlayerCamera';
import {paddle, table, ball} from '../constants.js';
import io from 'socket.io-client';
import backgroundSound from './../music.mp3'
import paddleCollisionSound from './../paddleCollision.wav'
import goalSoundi from './../point_scored.wav'
import wallSoundi from './../ball_against_walls_top_and_bottom.wav'

function Game(props) {



    const [ballPosition, setBallPosition] = useState({ x: (table.width - ball.diameter) / 2 + 10, y: (table.height - ball.diameter) / 2});
    const [ballVelocity, setBallVelocity] = useState({ x: 5, y: 5 });

    const [player1Position, setPlayer1Position] = useState((table.height - paddle.height) / 2);
    const [player2Position, setPlayer2Position] = useState((table.height - paddle.height) / 2);

    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

    const paddleId = props.paddleId;
    const roomId = props.roomId;

    const leftPaddleX = 30
    const rightPaddleX = table.width - paddle.width - 30

    const background =  new Audio(backgroundSound);
    background.volume = 0.1;
    const paddleSound =  new Audio(paddleCollisionSound);
    const wallSound = new Audio(wallSoundi);
    const goalSound = new Audio(goalSoundi);

    useEffect(()=>{
        background.play();
    }, []);

    // SOCKET STUFF -----------------------------------------------
    // let socket = null;
    // useEffect(() =>{
    //     socket = io('https://pushup-pong.herokuapp.com/');
    //     socket.on('paddle_move', function(data) {
    //         var dy = data.dy;
    //         console.log(data);
    //         updatePaddle(dy); // This function should update the position of the opponent's paddle
    //     });

    // }, []);

    // function movePaddle(dy) {
    //     socket.emit('paddle_move', {dy: dy, room: roomId});
    //     console.log(dy)
    // }


    // function updatePaddle(dy) {
    //     if (paddleId === 'left'){
    //         player2Position = dy;
    //     } else if(paddleId === 'right'){
    //         player1Position = dy;
    //     }
    // }
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('https://pushup-pong.herokuapp.com/%27');
        socketRef.current.on('paddle_move', (data) => {
            const dy = data.dy;
            console.log(data);
            updatePaddle(dy);
        });
        socketRef.current.on('score_changed', function(newScores) {
            updateScores(newScores); // This function should update the scores displayed on the screen
        });
        socketRef.current.on('ball_position_changed', function(data) {
            updateBallPosition(data.position); // This function should update the ball's position on the screen
            updateBallVelocity(data.velocity); // This function should update the ball's velocity
        });

  
      // Cleanup function to disconnect the socket when the component is unmounted
    //   return () => {
    //     if (socketRef.current) {
    //       socketRef.current.disconnect();
    //     }
    //   };
    }, []);
  
    function movePaddle(dy) {
      if (socketRef.current) {
        socketRef.current.emit('paddle_move', { dy: dy, room: roomId });
        console.log(dy);
      }
    }
  
    function updatePaddle(dy) {
      if (paddleId === 'left') {
        console.log(paddleId)
        player2Position = dy;
      } else if (paddleId === 'right') {
        console.log(paddleId)
        player1Position = dy;
      }
    }

    function playerScored(scoringPlayer) {
        socketRef.current.emit('score_update', {scoringPlayer: scoringPlayer, room: roomId});
    }
    function updateScores(newScores){
        const [left, right] = newScores;
        setPlayer1Score(left);
        setPlayer2Score(right);
        console.log(left + " : " + right);
    }

    function updateBallPosition(pos){
        setBallPosition(pos);
    }

    function updateBallVelocity(vel){
        setBallVelocity(vel);
    }
    function sendBallUpdate(ball) {
        socketRef.current.emit('ball_update', {room: roomId, position: ball.position, velocity: ball.velocity});
    }
    // END SOCKET STUFF ---------------------------------------------

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
        } else if (ballPosition.y >= table.height - ball.diameter){
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
            playerScored('right');
            setBallPosition({ x: table.width / 2 + 10, y: 200 });
            setBallVelocity({ x: 5, y: 5 });
            return;
        } else if (ballPosition.x >= table.width) {
            goalSound.play();
            setPlayer1Score((prevScore) => prevScore + 1);
            playerScored('left');
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
            
            if (ballVelocity.x < 0){
                paddleSound.play();
                setBallVelocity((prevVelocity) => ({

                    x: -prevVelocity.x, //* 1.05,
                    y: prevVelocity.y //* 1.05 // (ballPosition.y - (player1Position + 40)) / 10,
    
                }));
            }
        } else if (
            ballPosition.x + ball.diameter >= rightPaddleX &&
            ballPosition.y >= player2Position &&
            ballPosition.y <= player2Position + paddle.height
        ) {
            if (ballPosition.x > rightPaddleX + paddle.width) {
                console.log('behind paddle')
            } else {
                paddleSound.play();
                if (ballVelocity.x > 0){
                    setBallVelocity((prevVelocity) => ({
                        x: -prevVelocity.x,
                        y: prevVelocity.y,
                    }));
                }
            }
        }
        sendBallUpdate({ballPosition, ballVelocity});

    }, [ballPosition, player1Position, player2Position]);

    const handleKeyDown = (e) => {
        // Move player paddles up or down on key press
        console.log(window.innerHeight * 0.2)
        // if (e.key === 'w') {
        //     setPlayer1Position(Math.max(player1Position - 20, 0));
        // } else if (e.key === 's') {
        //     setPlayer1Position(Math.min(player1Position + 20, table.height - paddle.height))
        // } else if (e.key === 'ArrowUp') {
        //     setPlayer2Position(Math.max(player2Position - 20, 0));
        // } else if (e.key === 'ArrowDown') {
        //     setPlayer2Position(Math.min(player2Position + 20, table.height - paddle.height))
        // }
        if (paddleId === "left"){
            if (e.key === 'ArrowUp') {
                setPlayer1Position(Math.max(player1Position - 20, 0));
            } else if (e.key === 'ArrowDown') {
                setPlayer1Position(Math.min(player1Position + 20, table.height - paddle.height))
            }
            movePaddle(player1Position);
        }
        if (paddleId === "right"){
            if (e.key === 'ArrowUp') {
                setPlayer2Position(Math.max(player2Position - 20, 0));
            } else if (e.key === 'ArrowDown') {
                setPlayer2Position(Math.min(player2Position + 20, table.height - paddle.height))
            }
            movePaddle(player2Position);
        }
    };

    return (
        <>
        <div >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <PlayerCamera marginLeft="40px"></PlayerCamera>
                <Scoreboard player1Score={player1Score} player2Score={player2Score}></Scoreboard>
                <h1>{props.roomId}</h1>
                <h1>{props.paddleId}</h1>
                <PlayerCamera marginRight="40px"></PlayerCamera>
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
                    // border: '1px solid red',
                    position: 'relative',
                    width: table.width,
                    height: table.height,
                    backgroundColor: 'white',
                    userSelect: 'none',
                    outline: 'none'
                }}
            >
                <Ball x={ballPosition.x} y={ballPosition.y} />
                <Paddle x={leftPaddleX} y={player1Position} width={paddle.width} height={paddle.height} />
                <Paddle x={rightPaddleX} y={player2Position} width={paddle.width} height={paddle.height}/>
            </div>
        </div>
        </>
    );
}

export default Game;
