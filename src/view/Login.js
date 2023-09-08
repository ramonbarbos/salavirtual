import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, TextField, Typography, Card, Alert, Backdrop,CircularProgress } from '@mui/material';

import { AuthContext } from '../control/auth';

function Login() {
    const { logar } = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();
  
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
  
 
 
  
    const handleAlertClose = () => {
        setAlertOpen(false);
      };

      const handleSubmit = async (e) => {

        try {
          const response = await fetch('http://10.0.0.120/apiSala/usuarios/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              login: user,
              senha: pass,
            }),
          });
    
          const data = await response.json();
    
          // Verifique a resposta da API para determinar o sucesso do login
          if (data.tipo === 'sucesso') {
            const id = data.resposta.logado;
    
            logar(id, user, pass);
            navigate('/home'); // Redireciona para a página Home
          } else {
            setAlertMessage('Login inválido. Verifique suas credenciais.');
            setAlertSeverity('warning');
            setAlertOpen(true);
          }
        } catch (error) {
         
            setAlertMessage('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
       
        
       
      
        
      };

    return (
      <div>
         


      <Box
        sx={{
          width: '100',
          height: '100vh',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{ padding: '25px' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Login
        </Typography>
        {alertOpen && (
          <Alert sx={{ marginTop: '5px' }} severity={alertSeverity} onClose={handleAlertClose}>
            {alertMessage}
          </Alert>
        )}

        <Box mt={1}>
          <TextField
            required
            id="login"
            label="Login"
            fullWidth // Ocupar a largura total
            value={user}
            onChange={(e) => setUser(e.target.value)}
            sx={{ marginTop: 2 }} // Espaçamento superior
          />
           <TextField
            required
            id="senha"
            label="Senha"
            type="password"
            fullWidth // Ocupar a largura total
            autoComplete="current-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            sx={{ marginTop: 2 }} // Espaçamento superior
          />
        </Box>

        <Button 
          variant="contained"
          onClick={handleSubmit}
          style={{ display: 'block', margin: 'auto', marginTop: 2 }}
        >
          Entrar
        </Button >
       
      </Card>


      </Box>
      </div>
      
    );
  }
  
  export default Login;
  