import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import './../App.css';

function HomePage() {
    const inputRef = useRef(null);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        alert('Room Feature not fully implemented');
        // navigate(`/waiting/${inputRef.current.value}`);
    }

    function handleButtonClick() {
        navigate('/game');
    }

    function handleJoinClick() {
        navigate('/waiting/' + document.getElementById('code').innerHTML);
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
                position: 'relative',
                top: '-70px',
            }}
            className="homepage"
        >
            <h1 className="title">Push Up Pong</h1>
            <div>
                <button onClick={handleButtonClick} className="button">
                    START GAME
                </button>
            </div>
            <div>
                <p className="or">OR</p>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <p style={{ textAlign: 'center' }}>Enter Code to Join:</p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <form onSubmit={handleSubmit} className="form">
                        <input type="text" ref={inputRef} />
                        <button type="submit">JOIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
