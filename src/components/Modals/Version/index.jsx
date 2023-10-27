import * as React from "react";
import { Modal, Fade, Backdrop, Card, Grid, List, ListItem, Icon } from "@mui/material";
import PropTypes from "prop-types";

// Kaizen Dashboard components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

import { version } from "services/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "30%" },
  py: 4,
};

export default function ModalVersion({ open, handleClose }) {
  const cambiosAgregados = [
    // "Agregado envio de imagenes",
    // "Mejorado manejo de archivos",
  ];

  const cambiosModificados = [];

  const cambiosCorregidos = [
    // "Corregidos bugs relacionados a los archivos",
  ];

  const cambiosEliminados = [];

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card sx={style}>
          <SoftBox px={3}>
            <Grid container justifyContent="space-between" alignItems="center" pb={1} pt={2}>
              <SoftTypography variant="h6">Novedades de la Versión&nbsp;</SoftTypography>
              <SoftTypography variant="h6" fontWeight="light">
                {version}
              </SoftTypography>
            </Grid>
          </SoftBox>
          <SoftBox px={3}>
            {cambiosAgregados.length > 0 && (
              <Grid item xs={12}>
                <SoftTypography variant="caption" fontWeight={"bold"}>
                  Agregado:
                </SoftTypography>
              </Grid>
            )}
            <List>
              {cambiosAgregados.map((cambio, index) => (
                <ListItem key={index}>
                  <Icon mr={2}>chevron_right</Icon>
                  <SoftTypography variant="caption">{cambio}</SoftTypography>
                </ListItem>
              ))}
            </List>
          </SoftBox>
          <SoftBox px={3}>
            {cambiosModificados.length > 0 && (
              <Grid item xs={12}>
                <SoftTypography variant="caption" fontWeight={"bold"}>
                  Modificado:
                </SoftTypography>
              </Grid>
            )}
            <List>
              {cambiosModificados.map((cambio, index) => (
                <ListItem key={index}>
                  <Icon mr={2}>chevron_right</Icon>
                  <SoftTypography variant="caption">{cambio}</SoftTypography>
                </ListItem>
              ))}
            </List>
          </SoftBox>
          <SoftBox px={3}>
            {cambiosCorregidos.length > 0 && (
              <Grid item xs={12}>
                <SoftTypography variant="caption" fontWeight={"bold"}>
                  Corregido:
                </SoftTypography>
              </Grid>
            )}
            <List>
              {cambiosCorregidos.map((cambio, index) => (
                <ListItem key={index}>
                  <Icon mr={2}>chevron_right</Icon>
                  <SoftTypography variant="caption">{cambio}</SoftTypography>
                </ListItem>
              ))}
            </List>
          </SoftBox>
          <SoftBox px={3}>
            {cambiosEliminados.length > 0 && (
              <Grid item xs={12}>
                <SoftTypography variant="caption" fontWeight={"bold"}>
                  Eliminado:
                </SoftTypography>
              </Grid>
            )}
            <List>
              {cambiosEliminados.map((cambio, index) => (
                <ListItem key={index}>
                  <Icon mr={2}>chevron_right</Icon>
                  <SoftTypography variant="caption">{cambio}</SoftTypography>
                </ListItem>
              ))}
            </List>
          </SoftBox>

          <SoftBox px={3}>
            <Grid item xs={12}>
              <SoftTypography variant="caption" fontWeight={"bold"}>
                {/* Recomendamos cerrar sesión y volver a ingresar para ver los cambios.
                 */}
                Se recomienda aplicar el atajo &#39;Ctrl + Shirt + R&#39; para poder ver los cambios.
              </SoftTypography>
            </Grid>
          </SoftBox>
          <SoftBox display="flex" justifyContent="flex-end" alignItems="center" px={3} pt={3}>
            <SoftBox>
              <SoftButton variant="gradient" color="dark" onClick={handleClose}>
                Aceptar
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Card>
      </Fade>
    </Modal>
  );
}

ModalVersion.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
