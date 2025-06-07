// AfiliadoTable.jsx

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteAfiliado } from "../../api/afiliado";
import { useHeadline } from "../../context/HeadlinesContext";

export default function AfiliadoTable() {
  const { id } = useParams(); // <-- corregido
  const navigate = useNavigate();
  const { afiliados, getAfiliados } = useHeadline();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAfiliado, setSelectedAfiliado] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
  if (id) {
    getAfiliados(id);
  }
}, [id, getAfiliados]);

  const handleDeleteClick = (afiliado) => {
    setSelectedAfiliado(afiliado);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedAfiliado(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAfiliado(selectedAfiliado._id);
      setSnackbarMessage("Afiliado eliminado correctamente");
      setSnackbarOpen(true);
      getAfiliados(id); // <-- corregido
    } catch (error) {
      console.error("Error al eliminar afiliado", error);
    }
    handleCloseDialog();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const customTooltipProps = {
    arrow: true,
    placement: "top",
    componentsProps: {
      tooltip: {
        sx: {
          bgcolor: "#fff",
          color: "#0097B2",
          fontWeight: "bold",
          fontSize: "0.8rem",
          border: "1px solid #0097B2",
        },
      },
    },
  };

  if (!afiliados || afiliados.length === 0)
    return (
      <Typography variant="h6" sx={{ color: "black", mt: 2 }}>
        No hay Afiliados registrados para este titular.
      </Typography>
    );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e0f0ff" }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {afiliados.map((a, i) => (
              <TableRow key={a._id || i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{a.nombreAfiliado}</TableCell>
                <TableCell>{a.apellidoAfiliado}</TableCell>
                <TableCell>{a.documentoAfiliado}</TableCell>
                <TableCell>{a.direccionAfiliado}</TableCell>
                <TableCell>
                  <Tooltip title="Ver Detalles" {...customTooltipProps}>
                    <IconButton
                      onClick={() => navigate(`/get-afiliado/${a._id}`)}
                      sx={{ "&:hover svg": { color: "#0097B2" } }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar Afiliado" {...customTooltipProps}>
                    <IconButton
                      onClick={() => navigate(`/update-afiliado/${a._id}`)}
                      sx={{ "&:hover svg": { color: "#0097B2" } }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Eliminar Afiliado" {...customTooltipProps}>
                    <IconButton
                      onClick={() => handleDeleteClick(a)}
                      sx={{ "&:hover svg": { color: "#ff0000" } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          ¿Deseas eliminar este afiliado?
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ color: "gray" }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} sx={{ color: "#0097B2" }}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
