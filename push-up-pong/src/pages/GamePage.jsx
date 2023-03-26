import { useNavigate } from 'react-router-dom';
import Game from '../components/Game';

function GamePage() {
    const navigate = useNavigate();

    function handleButtonClick() {
        navigate('/');
    }

    return <Game></Game>;
}

export default GamePage;
