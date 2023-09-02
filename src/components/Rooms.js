import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


function Rooms() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();


    const handleSala = (id) => {
        navigate(`/sala/${id}`)
      };
    

    const fetchSalas = async () => {
        try {
          const response = await fetch('http://10.0.0.120/apiSala/salas/listar');
          const responseData = await response.json();
    
          if (responseData.tipo === 'sucesso') {
            setRows(responseData.resposta);
          } else {
            console.log('Nenhum registro');
          }
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        fetchSalas(); // Buscar usuários inicialmente
    
        const interval = setInterval(fetchSalas, 3000); // Atualizar a cada 5 segundos
    
        return () => {
          clearInterval(interval); // Limpar intervalo ao desmontar o componente
        };
      }, []);
    

  return (
    <div>
      <h2>Salas existentes</h2>
      {rows.map((row) => (
     <div key={row.id}>
        <p>Nome da Sala: {row.nome}</p>
        <p>Data de  Criação: {row.created_at}</p>
        <p>Criado por: {row.usuario_id}</p>
        <button onClick={() => handleSala(row.id)}>Salas Existentes</button>
        <p>-----------------------</p>
     </div>
       ))}
    </div>
  );
}

export default Rooms;
