import React from 'react';
import UserCamera from './UserCamera';

function PlayerCamera(props) {
    const { ai } = props;
    return (
        <div
            style={{
                width: '20vw',
                height: '20vh',
                backgroundColor: 'grey',
                borderRadius: '10px',
                margin: '10px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {ai ? (
                <img
                    src={
                        'http://www.the-madhatters.co.uk/wp-content/uploads/sites/552/2017/07/Mad-Hatter-Character.png'
                    }
                    alt={'Mad Hatter'}
                    style={{
                        position: 'relative',
                        width: '100%',
                    }}
                ></img>
            ) : (
                <UserCamera></UserCamera>
            )}
        </div>
    );
}

export default PlayerCamera;
