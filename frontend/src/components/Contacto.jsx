import { Box, TextField, Button, Typography, Grid } from '@mui/material';

function Contacto() {
  return (
    <Box id="contacto" sx={{ bgcolor: '#e8e5fa', py: 6, px: 4 }}>
      <Typography variant="h5" align="center" mb={4}>
        Contáctanos
      </Typography>

      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Logo grande al lado izquierdo */}
        <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src="/images/logo.png" // asegúrate de que esta ruta sea correcta
            alt="Logo funeraria"
            sx={{ width: '100%', maxWidth: 300 }}
          />
        </Grid>

        {/* Formulario al lado derecho */}
        <Grid item xs={12} md={6}>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Nombre" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Apellido" fullWidth />
              </Grid>
            </Grid>

            <TextField label="Email" type="email" required fullWidth />
            <TextField label="Mensaje" multiline rows={4} fullWidth />
            <Box textAlign="right">
              <Button type="submit" variant="contained" color="primary">
                Enviar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Contacto;
