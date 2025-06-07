import { Box, Typography } from '@mui/material';
import portadaFlor from '../assets/portada.png';

function Portada() {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 300, md: 450 } }}>
      <img
        src={portadaFlor}
        alt="Flor blanca"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '12%',
          left: '12%',
        bgcolor: 'rgba(225, 215, 200, 0.3)',
          p: 12,
          maxWidth: 190,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontStyle="italic">
          "En cada despedida, dejamos un pedazo de amor que perdura en el corazón."
        </Typography>
      </Box>
    </Box>
  );
}

export default Portada;
