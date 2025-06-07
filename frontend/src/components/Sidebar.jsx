import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box width={220} bgcolor="#E6E6FA" p={2} sx={{ color: "black" }}>
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <img src={logo} alt="Logo" width={80} />
        <Typography variant="h6" sx={{ color: "black" }}>Cobrador</Typography>
      </Box>
      <List>
        <ListItem button onClick={() => navigate("/headlines")}>
          <ListItemIcon sx={{ color: "#0097B2"  }}><GroupIcon /></ListItemIcon>
          <ListItemText primary="Gestión de Titulares" sx={{ color: "black" }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon sx={{color: "#0097B2"  }}><PaymentIcon /></ListItemIcon>
          <ListItemText primary="Pagos Pendientes" sx={{ color: "black" }} />
        </ListItem>
      </List>
    </Box>
  );
}
