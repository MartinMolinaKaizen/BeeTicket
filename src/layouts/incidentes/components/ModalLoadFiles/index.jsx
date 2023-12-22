import { Card, CircularProgress, Fade, Grid, Icon, Input, InputLabel, Modal } from "@mui/material";
import SoftBox from "../../../../components/SoftBox";
import SoftButton from "../../../../components/SoftButton";
import SoftTypography from "../../../../components/SoftTypography";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { urlBase } from "../../../../services/config";

import { MessageManager } from "../../../../context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90%",
  width: "30%",
  overflow: "auto",
  py: 4,
};

export default function ModalLoadFiles({ open, handleClose }) {
  const { handleSnackbar } = useContext(MessageManager);
  const [archivo, setArchivo] = useState(null);
  const [loading, setLoading] = useState(false);


  const toggleInput = () => {
    document.getElementById("input-image").click();
  };


  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
      >
        <Fade in={open}>
          <Card sx={style}>
            <SoftBox px={3}>
              <SoftTypography variant="h6" color="primary">
                Subir Archivo
              </SoftTypography>
            </SoftBox>
            <SoftBox px={3}>
              <InputLabel htmlFor="loadFile">
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  &nbsp;
                </SoftTypography>
              </InputLabel>
              <SoftButton
                variant="gradient"
                color="primary"
                onClick={toggleInput}
                name="loadFile"
                fullWidth
                disabled={loading}
              >
                <Icon sx={{ fontWeight: "thin" }}>
                  upload
                </Icon>
                &nbsp; Cargar un archivo
              </SoftButton>
              <SoftBox ml={3} sx={{ display: "none" }}>
                <Input
                  type="file"
                  id="input-image"
                  onChange={(e) => setArchivo(e.target.files[0])}
                  name="loadFile"
                />
              </SoftBox>
              {archivo ?
                (<SoftBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ pt: 0.5 }}
                >
                  <SoftTypography variant="caption" component="p" color="text">
                    {archivo?.name}
                  </SoftTypography>
                  <Icon
                    onClick={() => {
                      setArchivo(null);
                      document.getElementById("input-image").value = "";
                    }}
                    sx={{ fontWeight: "regular", cursor: "pointer" }}
                  >
                    cancel
                  </Icon>
                </SoftBox>)
                : null
              }
            </SoftBox>
            <SoftBox display="flex" justifyContent="flex-end" alignItems="center" px={4} pt={3}>
              <SoftBox m={3}>
                <SoftButton
                  variant="gradient"
                  color="dark"
                  onClick={() => {
                    handleClose();
                    setArchivo(null);
                  }}
                // disabled={loading}
                >
                  Cancelar
                </SoftButton>
              </SoftBox>
              <SoftBox>
                <SoftButton
                  variant="gradient"
                  color="primary"
                // onClick={enviarDoc}
                // disabled={!archivo || loading}
                >
                  {/* {loading ? <CircularProgress color="inherit" size={20} /> : "Guardar"} */}
                  Guardar
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </Card>
        </Fade>
      </Modal>
    </>
  )
}

ModalLoadFiles.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}