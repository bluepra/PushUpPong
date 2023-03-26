import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    function handleButtonClick() {
        navigate('/game');
    }

    return (
        <div>
            <h1>PUSH UP PONG</h1>
            <button onClick={handleButtonClick}>Play Game</button>
        </div>
    );
}

export default HomePage;
