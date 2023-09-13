import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, Typography, Card, AppBar,  Backdrop,CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



function Usuarios() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  //PROGESSO
  const [openProgress, setOpenProgress] = React.useState(false);
  const handleCloseProgress = () => {
    setOpenProgress(false);
  };
  const handleOpenProgress = () => {
    setOpenProgress(true);
  };


  const fetchUser = async () => {
    try {
      const response = await fetch('http://10.0.0.120/apiSala/usuarios/online');
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
    fetchUser();

    const interval = setInterval(fetchUser, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      <AppBar sx={{ justifyContent: 'center', display: 'flex', flexDirection:'row', width:'100%', alignItems:'center',  height:'65px' }}>
        <Box sx={{ width: '10%' }}>
          <Button
          variant="contained"
            onClick={() => {
              handleOpenProgress();
                setTimeout(() => {
                navigate(`/`);
                handleCloseProgress()
                }, 250)
             
            }}
            startIcon={<ArrowBackIcon />} // Use o ícone corretamente aqui
            sx={{ marginBottom: '10px' }}
          >
            Voltar
          </Button>
        </Box>
        <Box  sx={{ width: '75%' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
            Usuarios Online
          </Typography>
        </Box>
      </AppBar>

      <Box
          sx={{
            width: '70%',
            height: '60vh',
            justifyContent: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '100px'
          }}
        >
          {rows.map((row) => (
            <Card key={row.id} sx={{ padding: '25px', width: '250px', height: '200px' }}>
              <p>Nome: {row.nome}</p>
              <p>Sobrenome: {row.sobrenome}</p>
              <p>ATIVO</p>
              <Button>Entrar</Button>
            </Card>
          ))}
        </Box>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openProgress}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Usuarios;
