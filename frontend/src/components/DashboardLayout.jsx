import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout({ children }) {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Header />
        <Box p={1} flexGrow={1}> {/* <- aquí cambias el padding */}
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
