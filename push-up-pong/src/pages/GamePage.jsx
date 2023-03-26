import { useNavigate, useParams } from 'react-router-dom';
import Game from '../components/Game';

function GamePage() {
    const navigate = useNavigate();
    const {roomId, paddleId} = useParams();

    function handleButtonClick() {
        navigate('/');
    }

    return <Game roomId={roomId} paddleId={paddleId}></Game>;
}

export default GamePage;
