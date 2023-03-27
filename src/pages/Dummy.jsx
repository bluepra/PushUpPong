import {React, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import './../WaitingRoom.css'


function Dummy(props) {
    const { roomId } = useParams();

    const navigate = useNavigate();
    let paddle;

    useEffect(() => {
        // Connect to the socket.io server
        const socket = io('https://pushup-pong.herokuapp.com/');
        socket.emit('join', roomId);
        

        socket.on("assign_paddle", function (data) {
            
            // console.log(data.paddle)
            console.log(data)

            if (data.paddle === "left") {
              // Set up the left paddle for this client
                paddle = 'left';
            } else if (data.paddle === "right") {
              // Set up the right paddle for this client
                paddle = 'right';
            }
        });

        socket.on('player_joined', function() {
            // window.location.href = '/game/' + roomId; // switch to game screen
            console.log("testinadslkfja")
            navigate('/game' + '/' + roomId + '/' + paddle);
        });

        socket.on('room_full', function() {
            alert('The room is full. Redirecting to the home page...');
            // window.location.href = '/'; // go back to home page
        });

        // Clean up when component unmounts
        return () => {
          socket.disconnect();
        };
      }, []);

    return (
        <div className='waitingDiv'>
            <h1>Waiting For Other Players...</h1>
            <p><b>Room ID:</b> {roomId}</p>
        </div>
    );
}

export default Dummy;