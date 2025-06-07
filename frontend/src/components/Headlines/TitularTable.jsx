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
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useHeadline } from "../../context/HeadlinesContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TitularTable() {
  const { getHeadline, headlines, toggleEstadoTitular } = useHeadline();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTitular, setSelectedTitular] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    getHeadline();
  }, []);

  const handleOpenDialog = (titular) => {
    setSelectedTitular(titular);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedTitular(null);
    setOpenDialog(false);
  };

  const handleConfirmToggle = async () => {
    if (selectedTitular) {
      const updatedTitular = await toggleEstadoTitular(selectedTitular._id);
      if (updatedTitular) {
        setSnackbarMessage(
          updatedTitular.estadoTitular
            ? "Titular activado correctamente"
            : "Titular desactivado correctamente"
        );
        setSnackbarOpen(true);
        await getHeadline(); // Recargar titulares actualizados
      }
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

  if (headlines.length === 0)
    return (
      <Typography variant="h5" sx={{ color: "black" }}>
        No hay Titulares
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
            {headlines.map((t, i) => (
              <TableRow key={t._id || i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{t.nombreTitular}</TableCell>
                <TableCell>{t.apellidoTitular}</TableCell>
                <TableCell>{t.documentoTitular}</TableCell>
                <TableCell>{t.direccionTitular}</TableCell>
                <TableCell>
                  <Tooltip title="Ver Detalles" {...customTooltipProps}>
                    <IconButton
                      onClick={() => navigate(`/get-headlines/${t._id}`)}
                      sx={{ "&:hover svg": { color: "#0097B2" } }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar Titular" {...customTooltipProps}>
                    <IconButton
                      onClick={() => navigate(`/update-headlines/${t._id}`)}
                      sx={{ "&:hover svg": { color: "#0097B2" } }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title={
                      t.estadoTitular ? "Desactivar Titular" : "Activar Titular"
                    }
                    {...customTooltipProps}
                  >
                    <IconButton
                      onClick={() => handleOpenDialog(t)}
                      sx={{ "&:hover svg": { color: "#0097B2" } }}
                    >
                      <DeleteIcon
                        sx={{ color: t.estadoTitular ? "red" : "gray" }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Listar Afiliados" {...customTooltipProps}>
                    <Button
                      variant="text"
                      startIcon={<PersonAddIcon sx={{ color: "#0097B2" }} />}
                      sx={{ minWidth: 0, padding: 0 }}
                      onClick={() => navigate(`/titulares/${t._id}/afiliados`)} // corregido aquí
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            paddingTop: 4,
            paddingBottom: 2,
          }}
        >
          ¿Deseas {selectedTitular?.estadoTitular ? "Desactivar" : "Activar"} el
          Usuario?
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: 3 }}>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{ backgroundColor: "#e0e4fb", color: "black" }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmToggle}
            sx={{ backgroundColor: "#0097B2", color: "white" }}
          >
            Aceptar
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
