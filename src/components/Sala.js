import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'; // Importe o hook useParams

function Sala() {
   
    const { id } = useParams();


  return (
    <div>
      <h2>Salas: {id}</h2>
      
    </div>
  );
}

export default Sala;
