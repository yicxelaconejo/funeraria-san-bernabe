import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import AfiliadoTable from "../components/afiliados/AfiliadoTable";
import HeaderAfiliado from "../components/headerAfiliado";

export default function AfiliadosTablePage() {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box flex={1} p={2} bgcolor="#f5faff">
        <HeaderAfiliado />
        <AfiliadoTable />
      </Box>
    </Box>
  );
}
