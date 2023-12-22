// React components
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Kaizen Dashboard components
import DashboardLayout from "../../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../../components/Navbars/DashboardNavbar";
import SoftTypography from "../../../components/SoftTypography";
import SoftBox from "../../../components/SoftBox";
import SoftButton from "../../../components/SoftButton";
import SoftInput from "../../../components/SoftInput";
// @mui material components
import { Card, Icon, Grid, MenuItem, Select, InputLabel, Tooltip, Autocomplete, TextField, ListSubheader } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import InputDate from "./components/inputDate";
import InputText from "./components/inputText";
import useGetPantallas from "../hooks/useGetPantallas";
import usePostIncidente from "../hooks/usePostIncidente";
import AlertCreation from "../components/Alert";
import useGetIncidentPK from "../hooks/useGetIncidentPK";
import usePutIncidente from "../hooks/usePutIncidente";
import ModalLoadFiles from "../components/ModalLoadFiles";


function NewIncident() {
  const [incidenteNew, setIncidenteNew] = useState({});
  const { isAdmin, menu, titulos } = useGetPantallas();
  const [cardCreation, setCardCreation] = useState(false);
  const [createIncident, loadingPost, exitoPost] = usePostIncidente();
  const [updateIncident, loadingPut, exitoPut] = usePutIncidente()
  const [loading, setLoading] = useState(false);
  const [editar, indicentEdit] = useGetIncidentPK();
  const [modalLoadFiles, setModalLoadFiles] = useState(false);

  function handleChange(event) {
    const { target: { value, name } } = event;
    setIncidenteNew((incPrev) => ({ ...incPrev, [name]: value }))
  }

  const toggleInput = () => {
    document.getElementById("input-image").click();
  };

  async function handleGuardar() {
    if (editar) {
      updateIncident(incidenteNew, incidenteNew.incidente_id)
    } else {
      createIncident(incidenteNew);
    }
    setInitialState()
    setCardCreation(true)
  }

  const setInitialState = () => {
    setIncidenteNew({
      fechaCargaIncidente: null,
      fechaResolucionIncidente: null,
      tiempoDeResolucion: null,
      empresa: null,
      emisor: null,
      descripcionEmisor: null,
      estado: null,
      prioridad: "Baja",
      receptor: null,
      respuestaReceptor: null,
      pantalla_id: null
    })
  }

  useEffect(() => {
    if (editar) {
      setLoading(loadingPut);
    } else {
      setLoading(loadingPost);
    }
  }, [loadingPost, loadingPut]);

  useEffect(() => {
    setInitialState();
    if (editar) {
      setIncidenteNew(indicentEdit);
    }
  }, [indicentEdit]);

  return (
    // <DashboardLayout>
    <SoftBox p={6}>
      <DashboardNavbar />
      <SoftBox p={3}>
        <SoftBox m={3}>
          {cardCreation ?
            <Card>
              <SoftBox px={3} mb={3} mt={3}>
                <AlertCreation exitoPost={exitoPost} exitoPut={exitoPut} editar={editar} />
                <SoftBox display="flex" justifyContent="flex-end" alignItems="center" px={3} pt={3}>
                  <SoftBox m={3}>
                    <Link to="/incidentes">
                      <SoftButton variant="gradient" color="dark">
                        ir a incidentes
                      </SoftButton>
                    </Link>
                  </SoftBox>
                  <SoftBox>
                    <SoftButton
                      variant="gradient"
                      color="primary"
                      onClick={() => setCardCreation(false)}
                    >
                      <Icon>add</Icon>&nbsp; Crear otro incidente
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card> :
            <Card>
              <SoftBox px={3} mb={3} mt={3}>
                <SoftTypography variant="h6" color="primary">
                  <Icon
                    sx={{
                      fontSize: "1.5rem",
                      verticalAlign: "middle",
                      color: "primary.main",
                    }}
                  >
                    report
                  </Icon>
                  &nbsp; {editar ? `INCIDENTE: ${indicentEdit.incidente_keyId}` : "Crear un nuevo incidente"}
                </SoftTypography>

                <SoftTypography fontSize={12} color="secondary">
                  &nbsp; *Campos obligatorios
                </SoftTypography>
              </SoftBox>
              <SoftBox px={3}>
                <Grid container item spacing={2} justifyContent="center">
                  <Grid item xs={12} mb={-3} mt={2} fontWeight="bold" fontSize={14}></Grid>
                  <Grid item xs={3}>
                    <InputLabel htmlFor="archivos">
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        &nbsp;
                      </SoftTypography>
                    </InputLabel>
                    <Tooltip title={"Cargar archivos"} placement="top">
                      <SoftButton
                        variant="outlined"
                        color="secondary"
                        onClick={() => setModalLoadFiles(true)}
                      >
                        <Icon fontSize="large">
                          attach_file
                        </Icon>
                      </SoftButton>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={9} fontWeight="bold" fontSize={14}>
                    &nbsp;
                  </Grid>
                  {/* <Grid item xs={4.5}>
                    <InputDate
                      name="fechaCargaIncidente"
                      inputTitulo="Fecha de carga del incidente"
                      onChange={handleChange}
                      value={incidenteNew?.fechaCargaIncidente ?? ""}
                    />
                  </Grid> */}
                  {/* <Grid item xs={4}>
                    <InputText
                      name="empresa"
                      inputTitulo="Empresa"
                      onChange={handleChange}
                      value={incidenteNew?.empresa ?? ""}
                    />
                  </Grid> */}
                  <Grid item xs={4}>
                    {isAdmin ? (
                      <>
                        <InputLabel htmlFor="grouped-select">
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Pantalla *
                          </SoftTypography>
                        </InputLabel>
                        <Select defaultValue="" id="grouped-select" label="Grouping">
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {/* {
                            titulos.map((item) => (
                              <ListSubheader key={item.proyecto_id}>
                                {item.proyecto_desc}
                              </ListSubheader>
                            ))
                          }
                          {menu.map((item) => (
                            <MenuItem key={item.pantalla_id} value={item.pantalla_desc}>
                              {item.pantalla_desc}
                            </MenuItem>
                          ))} */}
                        </Select>
                      </>
                    ) : (<>
                      <>
                        <InputLabel htmlFor="pantalla_id">
                          <SoftTypography component="label" variant="caption" fontWeight="bold">
                            Pantalla *
                          </SoftTypography>
                        </InputLabel>
                        <Select
                          labelId="pantalla_id"
                          name="pantalla_id"
                          defaultValue=""
                          onChange={handleChange}
                          value={incidenteNew?.pantalla_id ?? ""}
                        >
                          {
                            menu.map((item) => (
                              <MenuItem key={item.pantalla_id} value={item.pantalla_desc}>
                                {item.pantalla_desc}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </>
                    </>)}
                  </Grid>
                  <Grid item xs={8} fontWeight="bold" fontSize={14}>
                    &nbsp;
                  </Grid>
                  {/* <Grid item xs={4}>
                    <InputText
                      name="emisor"
                      inputTitulo="Emisor *"
                      onChange={handleChange}
                      value={incidenteNew?.emisor ?? ""}
                    />
                  </Grid> */}
                  {/* <Grid item xs={4}>
                    <InputText
                      name="descripcionEmisor"
                      inputTitulo="Descripcion Emisor"
                      onChange={handleChange}
                      value={incidenteNew?.descripcionEmisor ?? ""}
                    />
                  </Grid> */}
                  {/* <Grid item xs={4}>
                    <InputText
                      name="estado"
                      inputTitulo="Estado"
                      onChange={handleChange}
                      value={incidenteNew?.estado ?? ""}
                    />
                  </Grid> */}
                  <Grid item xs={4}>
                    <InputLabel htmlFor="prioridad">
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Prioridad
                      </SoftTypography>
                    </InputLabel>
                    <Select
                      labelId="prioridad"
                      name="prioridad"
                      defaultValue="Baja"
                      inputProps={{ 'aria-label': 'Without label' }}
                      onChange={handleChange}
                      value={incidenteNew?.prioridad ?? ""}
                    >
                      <MenuItem value={"Baja"}>Baja</MenuItem>
                      <MenuItem value={"Media"}>Media</MenuItem>
                      <MenuItem value={"Alta"}>Alta</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={8} fontWeight="bold" fontSize={14}>
                    &nbsp;
                  </Grid>
                  {/* <Grid item xs={5}>
                    <InputText
                      name="receptor"
                      inputTitulo="Asignado a"
                      onChange={handleChange}
                      value={incidenteNew?.receptor ?? ""}
                    />
                  </Grid> */}
                  {/* <Grid item xs={1} fontWeight="bold" fontSize={14}>
                  &nbsp;
                </Grid> */}
                  {/* <Grid item xs={12}>
                    <InputLabel htmlFor="respuestaReceptor">
                      <SoftTypography component="label" variant="caption" fontWeight="bold">
                        Respuesta receptor
                      </SoftTypography>
                    </InputLabel>
                    <SoftInput
                      label="respuestaReceptor"
                      name="respuestaReceptor"
                      onChange={handleChange}
                      value={incidenteNew?.respuestaReceptor ?? ""}
                      rows={3}
                      multiline
                    />
                  </Grid> */}
                </Grid>
              </SoftBox>
              <SoftBox display="flex" justifyContent="flex-end" alignItems="center" px={3} pt={3}>
                <SoftBox m={3}>
                  <Link to="/incidentes">
                    <SoftButton variant="gradient" color="dark" onClick={() => setIncidenteNew({})}>
                      Cancelar
                    </SoftButton>
                  </Link>
                </SoftBox>
                <SoftBox>
                  <SoftButton
                    variant="gradient"
                    color="primary"
                    // disabled={availableButton || loading}
                    disabled={loading}
                    onClick={handleGuardar}
                  >
                    {loading ? <CircularProgress color="inherit" size={20} /> : "Guardar"}
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </Card>
          }
        </SoftBox>
      </SoftBox>
      <ModalLoadFiles
        open={modalLoadFiles}
        handleClose={() => setModalLoadFiles(false)}
      />
      {/* </DashboardLayout> */}
    </SoftBox>
  );
}

export default NewIncident;
