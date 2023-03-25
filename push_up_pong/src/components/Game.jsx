import React, { useState, useEffect, useRef } from 'react';
import Ball from './Ball';
import Paddle from './Paddle';

const Game = () => {
    const [ballX, setBallX] = useState(400);
    const [ballY, setBallY] = useState(300);
    const [ballSpeedX, setBallSpeedX] = useState(5);
    const [ballSpeedY, setBallSpeedY] = useState(5);
    const [paddleSpeed, setPaddleSpeed] = useState(10);
    const [leftPaddleY, setLeftPaddleY] = useState(250);
    const [rightPaddleY, setRightPaddleY] = useState(250);

    const canvasRef = useRef(null);
    const leftPaddleRef = useRef(null);
    const rightPaddleRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(moveBall, 50);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const moveBall = () => {
        const canvas = canvasRef.current;
        const leftPaddle = leftPaddleRef.current;
        const rightPaddle = rightPaddleRef.current;

        if (ballX <= 0 || ballX >= canvas.width - 20) {
            setBallSpeedX(-ballSpeedX);
        }

        if (ballY <= 0 || ballY >= canvas.height - 20) {
            setBallSpeedY(-ballSpeedY);
        }

        if (ballX <= 30 && ballY >= leftPaddleY && ballY <= leftPaddleY + 100) {
            setBallSpeedX(-ballSpeedX);
        }

        if (
            ballX >= canvas.width - 50 &&
            ballY >= rightPaddleY &&
            ballY <= rightPaddleY + 100
        ) {
            setBallSpeedX(-ballSpeedX);
        }

        const newBallX = ballX + ballSpeedX;
        const newBallY = ballY + ballSpeedY;

        setBallX(newBallX);
        setBallY(newBallY);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 38 && rightPaddleY > 0) {
            // Up arrow
            setRightPaddleY((rightPaddleY) => rightPaddleY - paddleSpeed);
        }

        if (e.keyCode === 40 && rightPaddleY < 500) {
            // Down arrow
            setRightPaddleY((rightPaddleY) => rightPaddleY + paddleSpeed);
        }

        if (e.keyCode === 87 && leftPaddleY > 0) {
            // W key
            setLeftPaddleY((leftPaddleY) => leftPaddleY - paddleSpeed);
        }

        if (e.keyCode === 83 && leftPaddleY < 500) {
            // S key
            setLeftPaddleY((leftPaddleY) => leftPaddleY + paddleSpeed);
        }
    };

    return (
        <div>
            <canvas ref={canvasRef} width={800} height={600} />
            <Ball x={ballX} y={ballY} />
            <Paddle ref={leftPaddleRef} x={20} y={leftPaddleY} />
            <Paddle ref={rightPaddleRef} x={760} y={rightPaddleY} />
        </div>
    );
};

export default Game;
