import React, { useState } from 'react';
import { Box, Button, Typography, AppBar, Menu, MenuItem,Backdrop,CircularProgress, TextField  } from '@mui/material';

const YouTubePlayer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  // Função para extrair o ID do vídeo a partir do URL
  const extractVideoIdFromUrl = (url) => {
    const match = url.match(/(?:\/|v=)([a-zA-Z0-9_-]{11})/);
    return match && match[1] ? match[1] : '';
  };

  const loadVideo = () => {
    // Extrai o ID do vídeo do URL inserido
    const videoIdFromUrl = extractVideoIdFromUrl(videoUrl);

    if (videoIdFromUrl) {
      setVideoId(videoIdFromUrl);
    }
  };

  return (
    <div>
        <Box sx={{width: '60%', height:'100vh', margin: 'auto', marginTop:'70px', boxShadow: '0px 3px 25px 0px #4f4f4f'}} >  
            <Box sx={{width: '100%', justifyContent:'center', alignItems:'center',}}>
                 <Box >
                    <iframe
                    width="100%"
                    height="590px"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allowFullScreen
                    title="Embedded Video"
                    ></iframe>
                </Box>
                <Box sx={{ height:'60px',marginTop: 2, alignItems:'center', justifyContent:'center', display:'flex'}}>
                    <TextField
                    label="Cole o Link aqui."
                    onChange={(e) => setVideoUrl(e.target.value)}
                    
                    sx={{ width:'80%', height:'100%'  }} // Espaçamento superior
                    />
                    <Button  sx={{ height:'100%' }} variant="contained" onClick={loadVideo}>Carregar Vídeo</Button>
                </Box>
            </Box>
               
      </Box>

    </div>
  );
};

export default YouTubePlayer;
