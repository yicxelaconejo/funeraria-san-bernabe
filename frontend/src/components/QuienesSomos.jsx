import { Box, Typography } from '@mui/material';
import fondo from '../assets/quienes-somos.png';

function QuienesSomos() {
  return (
    <Box
      id="quienes-somos" 
      sx={{
        position: 'relative',
        height: { xs: 300, md: 400 },
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mt: 6,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          bgcolor: 'rgba(255,255,255,0.8)',
          p: 3,
          maxWidth: 500,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5">¿Quiénes Somos?</Typography>
        <Typography variant="body1" mt={2}>
          En Funeraria San Bernabé, nos dedicamos a ofrecer un servicio integral y respetuoso...
        </Typography>
      </Box>
    </Box>
  );
}

export default QuienesSomos;
