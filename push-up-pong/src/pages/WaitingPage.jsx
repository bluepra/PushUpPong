import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';


function WaitingPage(props) {

    const navigate = useNavigate();
    
    useEffect(() => {
        const code = generateRandomString();
        navigate(`/waiting/${generateRandomString()}`)
    }, [])

    function generateRandomString() {
        let result = '';
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    return (
        <>
        </>
    );
}

export default WaitingPage;
