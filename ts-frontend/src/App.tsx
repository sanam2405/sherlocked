import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Level0 from './pages/level0.jsx';
import Level1 from './pages/level1.jsx';
import Level2 from './pages/level2.jsx';
import Level3 from './pages/level3.jsx'; 

function App() {
  const [loginCompleted, setLoginCompleted] = useState(false);
  const [level0Completed, setLevel0Completed] = useState(false);
  const [level1Completed, setLevel1Completed] = useState(false);
  const [level2Completed, setLevel2Completed] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [level3Completed, setLevel3Completed] = useState(false);

  const handleLoginCompletion = () => {
    setLoginCompleted(true);
  };

  const handleLevel0Completion = () => {
    setLevel0Completed(true);
  };

  const handleLevel1Completion = () => {
    setLevel1Completed(true);
  };

  const handleLevel2Completion = () => {
    setLevel2Completed(true);
  };

  const handleLevel3Completion = () => {
    setLevel3Completed(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onCompletion={handleLoginCompletion} />} />
        {loginCompleted ? (
          <Route path="/level0" element={<Level0 onCompletion={handleLevel0Completion} />} />
        ) : (
          <Route path="/level0" element={<Navigate to="/" />} />
        )}
        {level0Completed ? (
          <Route path="/level1" element={<Level1 onCompletion={handleLevel1Completion} />} />
        ) : (
          <Route path="/level1" element={<Navigate to="/level0" />} />
        )}
        {level1Completed ? (
          <Route path="/level2" element={<Level2 onCompletion={handleLevel2Completion} />} />
        ) : (
          <Route path="/level2" element={<Navigate to="/level1" />} />
        )}
        {level2Completed ? (
          <Route path="/level3" element={<Level3 onCompletion={handleLevel3Completion} />} />
        ) : (
          <Route path="/level3" element={<Navigate to="/level2" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
