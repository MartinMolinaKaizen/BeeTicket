// @mui material components
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Alert, Stack } from "@mui/material";

// Kaizen Dashboard components
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftBox";

// Kaizen Dashboard examples
import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Footer from "../../components/Footer";
import Table from "../../components/Tables/Table";
import SoftButton from "../../components/SoftButton";
import SoftInput from "../../components/SoftInput";
import Icon from "@mui/material/Icon";
import TresPuntos from './components/TresPuntos';
import Modaldelete from "../../components/Modals/Delete";

// Data
import { Link } from "react-router-dom";
import { CircularProgress, Grid, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { formatDate } from "../../utils/formatters";
import useGetIncidentes from "./hooks/useGetIncidentes";
import useDeleteIncidente from "./hooks/useDeleteIncidente";
import useGetProyectos from "./hooks/useGetProyectos";


function Columna({ variant, color, fontWeight, nombre, fecha }) {
  if (fecha) {
    return (<SoftTypography variant={variant} color={color} fontWeight={fontWeight}>
      {nombre ? formatDate(nombre) : "Sin especificar"}
    </SoftTypography>)
  } else {
    return (
      <SoftTypography variant={variant} color={color} fontWeight={fontWeight}>
        {nombre ? nombre : "Sin especificar"}
      </SoftTypography>
    )
  }
}

function Incidentes() {
  const [row, setRow] = useState([]);
  const [deleteIncident, loadingDelete] = useDeleteIncidente();
  const [openDelete, setOpenDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const { loading, datosVacios, refresh, isAdmin, noEncontrado, getIncByProyect, cantidadPaginas } = useGetIncidentes(adapterInc, pagina);
  const [filters, setFilters] = useState({
    inputSearch: "",
    inputSelect: "SELECCIONAR"
  });
  const [alertCartel, setAlertCartel] = useState("")

  useGetProyectos(adapterProyects);

  const columns = [
    { name: "fechaCargaIncidente", align: "center", desc: "Fecha de Carga" },
    { name: "incidente_keyId", desc: "ID Incidente", align: "center" },
    { name: "emisor", align: "center" },
    { name: "descripcionEmisor", align: "center", desc: "Descripcion del Emisor" },
    { name: "prioridad", align: "center" },
    { name: "estado", align: "center" },
    { name: "receptor", align: "center" },
    { name: "fechaResolucionIncidente", align: "center", desc: "Fecha de Resolucion" },
    { name: "action", align: "center", desc: "Acción" },
  ]

  const getRows = (items) => {
    let arrayRows = [];
    items.forEach((element) => {
      const { incidente_id } = element
      let newItem = {
        fechaCargaIncidente: <Columna variant="caption" color="secondary" fontWeight="medium" nombre={element?.fechaCargaIncidente} fecha={true} />,
        incidente_keyId: (
          <Link to="/incidentes/incidente" state={{ incidente_id }}>
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {element?.incidente_keyId ? element.incidente_keyId : "Sin especificar"}
            </SoftTypography>
          </Link>
        ),
        emisor: <Columna variant="caption" color="secondary" fontWeight="medium" nombre={element?.emisor} fecha={false} />,
        descripcionEmisor: <Columna variant="caption" color="secondary" fontWeight="medium" nombre={element?.descripcionEmisor} fecha={false} />,
        receptor: <Columna variant="caption" color="secondary" fontWeight="medium" nombre={element?.receptor} fecha={false} />,
        prioridad: <Columna variant="caption" color="secondary" fontWeight="medium" nombre={element?.prioridad} fecha={false} />,
        estado: <Columna variant="caption" color="secondary" fontWeight="medium" nombre={element?.estado} fecha={false} />,
        fechaResolucionIncidente: <Columna variant="caption" color="secondary" fontWeight="medium" nombre={element?.fechaResolucionIncidente} fecha={true} />,
        action: <TresPuntos incidente_id={incidente_id} borrar={() => { setIdToDelete(element?.incidente_id); setOpenDelete(true) }} />
      };
      arrayRows.push(newItem);
    });
    return arrayRows;
  };

  const fntDe = () => {
    deleteIncident(idToDelete, refresh);
  }

  //paginacion
  function handlePagination(event, value) {
    setPagina(value);
  };

  function adapterInc(incidentes) {
    setRow(getRows(incidentes))
  }

  function adapterProyects(proyectos) {
    let proyects = proyectos.map(p => p.empresa)
    setProyectos(proyects);
  }

  const searchFunction = () => {
    if (filters.inputSelect !== "SELECCIONAR") {
      getIncByProyect(filters.inputSelect);
    } else if (filters.inputSearch !== "") {
      refresh(filters.inputSearch);
    } else {
      refresh()
    }
  }

  useEffect(() => {
    searchFunction();
  }, [pagina]);

  return (
    <SoftBox p={4}>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <Grid container spacing={2} alignItems="center" px={3}>
              <Grid item xs={3}>
                <SoftTypography variant="button" fontWeight="bold" textTransform="capitalize">Incidentes</SoftTypography>
              </Grid>
              <Grid item xs={9}>
                <Grid container pt={2} pb={3} justifyContent="end" alignItems="center">
                  <Grid item xs={7} pl={5} pr={40} pb={isAdmin ? 2.5 : 11}>
                    {
                      isAdmin ? (<>
                        <InputLabel>
                          <SoftTypography component="small" variant="button" fontWeight="regular">
                            Empresa
                          </SoftTypography>
                        </InputLabel>
                        <Select
                          value={filters.inputSelect}
                          onChange={(e) => {
                            const { value } = e.target
                            if (value === "SELECCIONAR") {
                              setFilters({
                                inputSearch: "",
                                inputSelect: "SELECCIONAR"
                              });
                              setPagina(1);
                              setAlertCartel("")
                              refresh();
                            } else {
                              setFilters({
                                inputSearch: "",
                                inputSelect: value
                              })
                              setPagina(1);
                              setAlertCartel(value)
                              getIncByProyect(value);
                            }
                          }}
                        >
                          <MenuItem value="SELECCIONAR">
                            <em>SELECCIONAR</em>
                          </MenuItem>
                          {
                            proyectos.map((proy) => {
                              return (
                                <MenuItem key={proy} value={proy}>
                                  {proy}
                                </MenuItem>
                              )
                            })
                          }
                        </Select>
                      </>) : null
                    }
                  </Grid>
                  <Grid item xs={3} mr={2}>
                    <SoftInput
                      placeholder="Buscar..."
                      icon={{ component: "search", direction: "left" }}
                      value={filters.inputSearch}
                      onChange={(e) => {
                        setFilters({
                          inputSearch: e.target.value.trim() ? e.target.value : "",
                          inputSelect: "SELECCIONAR"
                        })
                        if (!e.target.value.trim()) {
                          setPagina(1);
                          setAlertCartel("");
                          refresh();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const { value } = e.target
                          const valor = value.trim()
                          setAlertCartel(valor)
                          if (valor) {
                            setPagina(1);
                            refresh(valor);
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={1.7}>
                    <Link to="/incidentes/nuevo">
                      <SoftButton variant="gradient" color="dark">
                        <Icon>add</Icon>&nbsp; Agregar
                      </SoftButton>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {loading ? (
              <SoftBox display="flex" justifyContent="center" m={3}>
                <CircularProgress color="primary" />
              </SoftBox>
            ) : (
              <SoftBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                {!datosVacios && alertCartel && noEncontrado ? (
                  <>
                    <Stack sx={{ width: '100%' }} spacing={2} mb={1}>
                      <Alert sx={{ paddingLeft: 4 }} severity="error" onClose={() => {
                        setFilters({
                          inputSearch: "",
                          inputSelect: "SELECCIONAR"
                        })
                        setAlertCartel("");
                        refresh();
                      }}>
                        <SoftTypography
                          component="span"
                          variant="h5"
                          fontWeight="medium"
                          color="info"
                          textGradient
                          sx={{ display: "inline-block", width: "max-content" }}>
                          {`NO SE ENCONTRARON RESULTADOS PARA: ${alertCartel}`}
                        </SoftTypography>
                      </Alert>
                    </Stack>
                  </>
                ) : !datosVacios && alertCartel ? (
                  <>
                    <Stack sx={{ width: '100%' }} spacing={2} mb={1}>
                      <Alert sx={{ paddingLeft: 4 }} severity="info" onClose={() => {
                        setFilters({
                          inputSearch: "",
                          inputSelect: "SELECCIONAR"
                        })
                        setAlertCartel("");
                        refresh();
                      }}>
                        <SoftTypography
                          component="span"
                          variant="h5"
                          fontWeight="medium"
                          color="info"
                          textGradient
                          sx={{ display: "inline-block", width: "max-content" }}>
                          {`RESULTADOS ENCONTRADOS PARA: ${alertCartel}`}
                        </SoftTypography>
                      </Alert>
                    </Stack>
                    <Table columns={columns} rows={row} />
                  </>
                ) : (
                  !datosVacios ? (
                    <Table columns={columns} rows={row} />
                  ) : (
                    <Grid container justifyContent="center" alignItems="center" py={3}>
                      <Grid item pb={3}>
                        <SoftTypography variant="caption" color="text">
                          No hay datos cargados
                        </SoftTypography>
                      </Grid>
                    </Grid>
                  )
                )}
              </SoftBox>
            )}
          </Card>
          <Card sx={{ mt: 2 }}>
            <Grid display="flex" alignItems="center" justifyContent="center" py={2}>
              <Pagination
                count={cantidadPaginas}
                defaultPage={1}
                siblingCount={1}
                color="primary"
                page={pagina}
                onChange={handlePagination}
              />
            </Grid>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
      <Modaldelete
        open={openDelete}
        handleClose={() => { setOpenDelete(false) }}
        functionDelete={fntDe}
      />
      {/* </DashboardLayout> */}
    </SoftBox>
  );
}

export default Incidentes;
