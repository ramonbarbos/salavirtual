import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import CreateRoom from './components/CreateRoom';
import Rooms from './components/Rooms';
import Sala from './components/Sala';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<CreateRoom />} />
          <Route path="/lobby" element={<Rooms />} />
          <Route path="/sala/:id" element={<Sala/>} /> {/* Rota da sala com parâmetro de ID */}
        </Routes>
    </Router>
  );
}

export default App;
