// import { useNavigate } from 'react-router-dom';

// function HomePage() {
//     const navigate = useNavigate();

//     function handleButtonClick() {
//         navigate('/game');
//     }

//     return (
//         <div>
//             <h1>PUSH UP PONG</h1>
//             <button onClick={handleButtonClick}>Play Game</button>
//         </div>
//     );
// }

// export default HomePage;

import { useNavigate } from 'react-router-dom';
import {useRef} from 'react'
import './../App.css'

function HomePage() {
    const inputRef = useRef(null);
    
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        navigate(`/waiting/${inputRef.current.value}`)
    }

    function handleButtonClick() {
        navigate('/waiting');
    }

    function handleJoinClick(){
        navigate('/waiting/' + document.getElementById('code').innerHTML)
    }


    return (
        // <button onClick={handleButtonClick}>Create Game</button>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <h1>Push Up Pong</h1>
            <div>
                <button onClick={handleButtonClick} className='button'>Create Game</button>
            </div>
            <div>
                <p>OR</p>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <p style={{ textAlign: 'center' }}>Enter Code to Join</p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <form onSubmit={handleSubmit} className="form">
                        <input type="text" ref={inputRef} />
                        <button type="submit">Join</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
