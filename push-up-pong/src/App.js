import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import WaitingPage from './pages/WaitingPage';
import NoseYProportion from './components/contexts/NoseYProportion';
import { useState } from 'react';

function App() {
    const [noseYProp, setNoseYProp] = useState(0.5);

    return (
        <Router>
            <NoseYProportion.Provider value={[noseYProp, setNoseYProp]}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/waiting" element={<WaitingPage />} />
                    <Route path="/game" element={<GamePage />} />
                </Routes>
            </NoseYProportion.Provider>
        </Router>
    );
}

export default App;
