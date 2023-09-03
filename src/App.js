import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import CreateRoom from './view/CreateRoom';
import Rooms from './view/Rooms';
import Sala from './view/Sala';

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
