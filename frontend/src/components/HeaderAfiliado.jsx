import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  MenuItem,
  Menu,
  Select,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function HeaderAfiliado() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleCloseMenu();
    navigate("/profile");
  };

  const handleLogout = () => {
    handleCloseMenu();
    logout();
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      bgcolor="#e0f8ff"
      px={2}
      py={1}
      borderRadius={2}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ color: "black" }}>
        Gestión de Afiliados
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <Select size="small" defaultValue="" sx={{ color: "black" }}>
          <MenuItem value="">Filtrar</MenuItem>
        </Select>

        <Link to="/register-afiliado" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon sx={{ color: "#0097B2" }} />}
            sx={{
              backgroundColor: "#EBEDFC",
              color: "black",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#dcdff2",
              },
            }}
          >
            Agregar Afiliado
          </Button>
        </Link>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#EBEDFC",
             color: "#0097B2",
            borderRadius: 1,
            pl: 1,
          }}
        >
          <SearchIcon />
          <TextField
            size="small"
            placeholder="Buscar"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={{ ml: 1  }}
          />
        </Box>

        {/* Perfil con menú */}
        <Box display="flex" alignItems="center" ml={3} gap={1}>
          <Box textAlign="right">
            <Typography fontWeight={600}>{user.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              COBRADOR
            </Typography>
          </Box>
          <IconButton onClick={handleOpenMenu}>
            <Avatar sx={{ color: "#0097B2"  }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            PaperProps={{
              sx: { bgcolor: "#e0f8ff", borderRadius: 2, mt: 1 },
            }}
          >
            <MenuItem onClick={handleProfile}>Ver Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}
