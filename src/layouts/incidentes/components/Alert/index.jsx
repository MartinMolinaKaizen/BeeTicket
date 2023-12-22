import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from "@mui/material/CircularProgress";


export default function AlertCreation({ exitoPost = true, exitoPut = true, editar }) {
  let mensaje = null;

  if (editar) {
    mensaje = exitoPut ? "Incidente editado correctamente" : "Fallo al editar, inténtelo más tarde";
  } else {
    mensaje = exitoPost ? "Incidente creado correctamente" : "Ha ocurrido un error, vuelva a intentarlo más tarde";
  }

  if (!mensaje) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <CircularProgress color="inherit" size={20} />
      </Stack>
    )
  }

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={editar ? (exitoPut ? "success" : "error") : (exitoPost ? "success" : "error")}>{mensaje}</Alert>
    </Stack>
  );
}
