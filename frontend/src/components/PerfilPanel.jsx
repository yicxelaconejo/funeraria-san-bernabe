import { Box, Typography, Avatar } from "@mui/material";

export default function PerfilPanel() {
  return (
    <Box width={220} bgcolor="#D6ECFF" p={2} textAlign="right">
      <Typography fontWeight={600}>Alex Fernandez</Typography>
      <Typography variant="body2" color="text.secondary">COBRADOR</Typography>
      <Avatar src="/avatar.png" sx={{ width: 48, height: 48, mt: 2, ml: 'auto' }} />
    </Box>
  );
}
