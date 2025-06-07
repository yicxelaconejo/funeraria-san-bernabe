import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import DetallesAfiliado from "../components/afiliados/DetallesAfiliado";
import HeaderAfiliado from "../components/headerAfiliado";

export default function DetalleAfiliadoPage() {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box flex={1} p={2} bgcolor="#f5faff">
        <HeaderAfiliado />
        <DetallesAfiliado />
      </Box>
    </Box>
  );
}
