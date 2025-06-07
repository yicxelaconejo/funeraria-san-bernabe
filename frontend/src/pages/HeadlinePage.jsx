import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TitularTable from "../components/Headlines/TitularTable";

export default function HeadlinePage() {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box flex={1} p={2} bgcolor="#f5faff">
        <Header />
        <TitularTable />
      </Box>
    </Box>
  );
}
