import { Box, Typography } from '@mui/material';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <Box sx={{ bgcolor: '#dcd9f2', py: 4, textAlign: 'center' }}>
      <img src={logo} alt="Logo" style={{ maxWidth: 100 }} />
      <Typography variant="body2" mt={2}>
        info@misitio.com · +52-123-123-456789 · &copy; 2025 Chicas en Línea
      </Typography>
    </Box>
  );
}

export default Footer;
