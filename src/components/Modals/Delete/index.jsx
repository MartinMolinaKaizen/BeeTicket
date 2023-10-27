import * as React from "react";
import { Modal, Fade, Backdrop, Card, Grid } from "@mui/material";
import PropTypes from "prop-types";

// Kaizen Dashboard components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "70%", md: "30%" },
  py: 4,
};

export default function Modaldelete({ open, handleClose, nombre, functionDelete }) {
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
            <SoftTypography variant="h6">Eliminar</SoftTypography>
          </SoftBox>
          <SoftBox px={3}>
            <Grid container justifyContent="start" alignItems="center" pb={1} pt={2}>
              <SoftTypography variant="h6" fontWeight="light">
                ¿Esta seguro que quiere eliminar <b>{nombre}</b>? Presione eliminar para confirmar 
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
              <SoftButton variant="gradient" color="primary" onClick={() => {functionDelete(); handleClose()}}>
                Eliminar
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Card>
      </Fade>
    </Modal>
  );
}

Modaldelete.defaultProps = {
  functionDelete: () => {},
};

Modaldelete.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  nombre: PropTypes.string,
  functionDelete: PropTypes.func,
};
