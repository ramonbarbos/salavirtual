import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Backdrop,CircularProgress 
} from '@mui/material';

function ModalEditarNome(props) {
  const { open, onClose, id } = props;
  const [novoNome, setNovoNome] = useState('');

  const handleNomeChange = (event) => {
    setNovoNome(event.target.value);
  };


    //PROGESSO
    const [openProgress, setOpenProgress] = React.useState(false);
    const handleCloseProgress = () => {
      setOpenProgress(false);
    };
    const handleOpenProgress = () => {
      setOpenProgress(true);
    };

  const handleEditarNome = async () => {
    console.log(JSON.stringify(novoNome))
    try {
        const response = await fetch(`http://10.0.0.120/apiSala/salas/atualizar/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome: novoNome }),
        });
  
        const data = await response.json();
  
        if (data.tipo === 'sucesso') {
            console.log('Atualizado');
            handleOpenProgress();
            setTimeout(() => {
              handleCloseProgress()
              }, 1000)
        } else {
            console.log('Erro ao cadastrar a sala');
        
        }
      } catch (error) {
        console.log('Erro ao cadastrar a sala', error);
       
      }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Nome</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Digite o novo nome da sala:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Novo Nome"
          type="text"
          name='nome'
          fullWidth
          value={novoNome}
          onChange={handleNomeChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleEditarNome} color="primary">
          Salvar
        </Button>
      </DialogActions>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openProgress}
        onClick={handleCloseProgress}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
}

export default ModalEditarNome;
