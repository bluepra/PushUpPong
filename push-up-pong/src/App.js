import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import WaitingPage from './pages/WaitingPage';
import Dummy from './pages/Dummy';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/waiting" element={<WaitingPage />} />
                <Route exact path="/waiting/:roomId" element={<Dummy/>} />
                <Route exact path="/game/:roomId/:paddleId" element={<GamePage />} />
            </Routes>
        </Router>
    );
}

export default App;
