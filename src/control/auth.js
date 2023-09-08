import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState({ iniciais: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAvatar = localStorage.getItem('avatar');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedAvatar) {
      setAvatar(JSON.parse(storedAvatar));
    }
  }, []);

  async function logar(id, login, senha) {
    if (login !== '' && senha !== '') {
      try {
        const response = await fetch(`http://10.0.0.120/apiSala/usuarios/listar/${id}`);
        const data = await response.json();

        if (data.tipo === 'sucesso') {
          const formUsuario = data.resposta;
          const nomeCompleto = `${formUsuario.nome} ${formUsuario.sobrenome}`;
          const iniciais = nomeCompleto
            .split(' ')
            .map((nome) => nome.charAt(0))
            .join('');
          setUser(formUsuario);
          setAvatar({ ...formUsuario, iniciais });
          localStorage.setItem('user', JSON.stringify(formUsuario));
          localStorage.setItem('avatar', JSON.stringify({ ...formUsuario, iniciais }));
        } else {
          console.log('Request failed:', response.status);
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    }
  }

  function logout() {
    setUser({});
    localStorage.removeItem('user');
    localStorage.removeItem('avatar');
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{logar, user, logout, avatar, setAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };