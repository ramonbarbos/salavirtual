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

          // Atualize o status online para 1 quando o usuário fizer login
          await atualizarStatusOnline(id, 1);

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

  async function logout() {
    // Atualize o status online para 0 quando o usuário fizer logout
    await atualizarStatusOnline(user.id, 0);

    setUser({});
    localStorage.removeItem('user');
    localStorage.removeItem('avatar');
    navigate('/login');
  }

  async function atualizarStatusOnline(userId, online) {
    try {
      const resOnline = await fetch(`http://10.0.0.120/apiSala/usuarios/online/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          online: online.toString(), // Converta para string
        }),
      });

      if (resOnline.status !== 200) {
        console.error('Falha ao atualizar status online:', resOnline.status);
      }
    } catch (error) {
      console.error('Erro ao atualizar status online:', error);
    }
  }

  return (
    <AuthContext.Provider value={{ logar, user, logout, avatar, setAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
