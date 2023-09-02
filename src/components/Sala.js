import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom'; // Importe o hook useParams
import { Box, Button, Typography, AppBar, Menu, MenuItem,Backdrop,CircularProgress  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppsIcon from '@mui/icons-material/Apps';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Sala() {
  const navigate = useNavigate();
  const [row, setRows] = useState('');

  const { id } = useParams();

  //PROGESSO
  const [openProgress, setOpenProgress] = React.useState(false);
  const handleCloseProgress = () => {
    setOpenProgress(false);
  };
  const handleOpenProgress = () => {
    setOpenProgress(true);
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

      const handleClickDelete =  async () => {
      
        try {
          const response = await fetch(`http://10.0.0.120/apiSala/salas/deletar/${id}`, {
          method: 'DELETE', // Use o método DELETE
        });
          const responseData = await response.json();

          if (responseData.tipo === 'sucesso') {
        
            console.log('Sala Excluida')
            handleCloseDialogDelete();
            handleOpenProgress();
            setTimeout(() => {
              navigate('/lobby'); 
              handleCloseProgress()
              }, 1000)
          } else {
            console.log('Nenhum registro');
          }
        } catch (error) {
          console.error(error);
        }
      }
 

    const fetchSalas = async () => {
      try {
        const response = await fetch(`http://10.0.0.120/apiSala/salas/listar/${id}`);
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
      fetchSalas();
  
      const interval = setInterval(fetchSalas, 3000);
  
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
              navigate(`/lobby`);
              handleCloseProgress()
              }, 250)
            }}
            startIcon={<ArrowBackIcon />} 
            sx={{ marginBottom: '10px' }}
          >
            Voltar
          </Button>
        </Box>
        <Box  sx={{ width: '75%' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}>
            Sala {row.nome}
          </Typography>
        </Box>

        <Button
        variant="contained"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClickMenu}
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
        <MenuItem onClick={handleCloseMenu}>Editar Nome</MenuItem>
        <MenuItem onClick={handleClickOpenDialogDelete}>Excluir Sala</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Modo Offline</MenuItem>
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
            Voce está preste a excluir a sala virtual "{row.nome}". Tem certeza dessa descisão?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete}>Não</Button>
          <Button onClick={handleClickDelete} autoFocus>Sim</Button>
        </DialogActions>
      </Dialog>

      </AppBar>

       
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

export default Sala;
