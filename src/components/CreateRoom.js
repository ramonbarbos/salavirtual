import React, { useState } from 'react';

function CreateRoom() {
  const [openSala, setOpenSala] = useState({
    nome: '',
    usuario_id: '',
    created_at: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOpenSala({
      ...openSala,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if  (
        openSala.nome === '' 
        //roomName.usuario_id === '' ||
        //roomName.created_at === '' 
    ) {
        console.log('Por favor, preencha todos os campos.');
        
      return;
    }
    try {
      const response = await fetch('http://10.0.0.120/apiSala/salas/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(openSala),
      });

      const data = await response.json();

      if (data.tipo === 'sucesso') {
        console.log('Sala cadastrada com sucesso');
      } else {
        console.log('Erro ao cadastrar a sala');
      }
    } catch (error) {
      console.log('Erro ao cadastrar a sala', error);
    }
  };

  return (
    <div>
      <h2>Criar uma Nova Sala</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome da Sala:
          <input
            type="text"
            name="nome"
            value={openSala.nome}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Criar Sala</button>
      </form>
    </div>
  );
}

export default CreateRoom;
