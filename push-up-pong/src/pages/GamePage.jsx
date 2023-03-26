import { useNavigate } from 'react-router-dom';
import Game from '../components/Game';
import UserCamera from '../components/UserCamera';

function GamePage() {
    const navigate = useNavigate();

    return <Game></Game>;
}

export default GamePage;
