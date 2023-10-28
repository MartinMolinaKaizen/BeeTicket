import * as React from "react";
import { Modal, Fade, Backdrop, Card, Icon, Grid } from "@mui/material";
import PropTypes from "prop-types";
// Kaizen Dashboard components
import SoftBox from "../../SoftBox";
import SoftTypography from "../../SoftTypography";
import SoftButton from "../../SoftButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "30%" },
  py: 4,
};

export default function ModalLogout({ open, handleClose, btnFunction }) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Card sx={style}>
          <SoftBox px={3}>
            <SoftTypography variant="h6">Cerrar sesión</SoftTypography>
          </SoftBox>
          <SoftBox px={3}>
            <Grid container justifyContent="start" alignItems="center" pb={1} pt={2}>
              <SoftTypography variant="h6" fontWeight="light">
                ¿Desea cerrar sesión? Recuerde que debe guardar los cambios realizados antes de
                cerrar sesión
              </SoftTypography>
            </Grid>
          </SoftBox>
          <SoftBox display="flex" justifyContent="flex-end" alignItems="center" px={3} pt={3}>
            <SoftBox mr={2}>
              <SoftButton variant="gradient" color="dark" onClick={handleClose}>
                Cancelar
              </SoftButton>
            </SoftBox>
            <SoftBox>
              <SoftButton variant="gradient" color="primary" onClick={btnFunction}>
                Salir
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Card>
      </Fade>
    </Modal>
  );
}

ModalLogout.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  btnFunction: PropTypes.func.isRequired
};
