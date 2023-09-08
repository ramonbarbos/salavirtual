import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppsIcon from '@mui/icons-material/Apps';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField, Typography, Card, Alert, Backdrop,CircularProgress, Menu, MenuItem, AppBar   } from '@mui/material';
import { AuthContext } from '../control/auth';

function CreateRoom() {
  const navigate = useNavigate();
  const { user, logout, avatar } = useContext(AuthContext);
  const [openSala, setOpenSala] = useState({
    nome: '',
    usuario_id: '',
    created_at: '',
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

    //PROGESSO
    const [openProgress, setOpenProgress] = React.useState(false);
    const handleCloseProgress = () => {
      setOpenProgress(false);
    };
    const handleOpenProgress = () => {
      setOpenProgress(true);
    };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  
  //MENU

    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    //DIALOGO
      const [openDialog, setOpenDialog] = React.useState(false);
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);

      const handleClickOpenDialogDelete =  () => {
      
        handleCloseMenu()
        handleOpenProgress();
          setTimeout(() => {
            setOpenDialog(true);
            handleCloseProgress()
          }, 1000)
      };

      const handleCloseDialogDelete = () => {
        setOpenDialog(false);
      };

      //ACAO LOGOUT
      const handleLogout =  () => {
        logout();
      }

      

  const handleSalas = () => {
    console.log('Botão de Salas clicado'); // Adicione esta linha
    handleOpenProgress()
    setTimeout(() => {
      navigate('/lobby'); 
      handleCloseProgress()
      }, 250)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOpenSala({
      ...openSala,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Botão de Salas clicado'); // Adicione esta linha
    console.log(openSala); // Adicione esta linha
    if  (
      openSala.nome === '' 
      //roomName.usuario_id === '' ||
      //roomName.created_at === '' 
  ) {
    setAlertMessage('Por favor, preencha todos os campos.');
    setAlertSeverity('warning');
    setAlertOpen(true);
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
        handleOpenProgress()
        setTimeout(() => {
           navigate(`/sala/${data.resposta.id_inserido}`);

          handleCloseProgress()
        }, 1000)
      } else {
        setAlertMessage('Já existente!');
        setAlertSeverity('info');
        setAlertOpen(true);
      }
    } catch (error) {
      console.log('Erro ao cadastrar a sala', error);
      setAlertMessage('Tente outro nome!');
      setAlertSeverity('info');
      setAlertOpen(true);
    }
  };

  return (
    <div>
      <AppBar sx={{ justifyContent: 'center', display: 'flex', flexDirection:'row', width:'100%', alignItems:'center',  height:'65px' }}>
      
       

        <Button
        variant="contained"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickMenu}
        sx={{}}
      >
        <AppsIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Perfil</MenuItem>
        <MenuItem onClick={handleClickOpenDialogDelete}>Sair</MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Exclusão de Sala"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voce está preste a excluir a sala virtual . Tem certeza dessa descisão?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleCloseDialogDelete}>Não</Button>
          <Button onClick={handleLogout} autoFocus>Sim</Button>
        </DialogActions>
      </Dialog>

      </AppBar>

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
          Criar uma Nova Sala
        </Typography>
        {alertOpen && (
          <Alert sx={{ marginTop: '5px' }} severity={alertSeverity} onClose={handleAlertClose}>
            {alertMessage}
          </Alert>
        )}

        <Box mt={1}>
          <TextField
            required
            name="nome"
            label="Nome da sala"
            onChange={handleInputChange}
            fullWidth // Ocupar a largura total
            sx={{ marginTop: 2 }} // Espaçamento superior
          />
        </Box>

        <Button 
          variant="contained"
          onClick={handleSubmit}
          style={{ display: 'block', margin: 'auto', marginTop: 2 }}
        >
          Criar Sala
        </Button >
        <Button 
        variant="contained"
          onClick={handleSalas}
          style={{ display: 'block', margin: 'auto', marginTop: 2 }}
        >
          Criar Existentes
        </Button >
      </Card>


      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openProgress}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
    </div>
   
  );
}

export default CreateRoom;
