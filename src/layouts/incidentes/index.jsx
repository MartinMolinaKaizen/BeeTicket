// @mui material components
import { useState, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";

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
import { indigo, blue } from "@mui/material/colors";

// Data
// import ModalDelete from "./components/ModalDelete"
import { Link } from "react-router-dom";
import { urlBase } from "../../services/config";
import axios from "axios";
import { CircularProgress, Grid, Pagination, Tooltip } from "@mui/material";
import { formatMoneyPunto, formatDate } from "../../utils/formatters";
// import ModalDetalle from "../../components";

const baseURL = urlBase + "concurrentes";

function Incidentes() {
    const [modalDelete, setModalDelete] = useState(false);
    const [concurrentes, setConcurrentes] = useState([]);
    const [post, setPost] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [modalNomencladorOpen, setModaNomencladorOpen] = useState(false);
    const [row, setRow] = useState([]);
    const [modalDetalles, setModalDetalles] = useState(false);
    const [detallesConcurrente, setDetallesConcurrente] = useState(null);

    const [filtro, setFiltro] = useState("");

    const [pagina, setPagina] = useState(1);
    const [cantidadPaginas, setCantidadPaginas] = useState(1);

    const [loading, setLoading] = useState(false);
    const [datosVacios, setDatosVacios] = useState(false);

    const [concurrenteABuscar, setConcurrenteABuscar] = useState("");



    const columns = [
        { name: "apellido", align: "center" },
        { name: "nombre", align: "center" },
        { name: "dni", align: "center" },
        { name: "fechaNacimiento", align: "center", desc: "Fecha nac." },
        { name: "programa", align: "center" },
        { name: "action", align: "center", desc: "Acción" },
    ];

    const getRows = (items) => {
        let arrayRows = [];
        items.forEach((element) => {
            let newItem = {
                nombre: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                        {element?.nombre ?? "Sin especificar"}
                    </SoftTypography>
                ),
                apellido: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                        {element?.apellido ?? "Sin especificar"}
                    </SoftTypography>
                ),
                dni: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                        {formatMoneyPunto(element?.dni) ?? "Sin especificar"}
                    </SoftTypography>
                ),
                fechaNacimiento: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                        {element?.fechaNacimiento ? formatDate(element?.fechaNacimiento) : "Sin especificar"}
                    </SoftTypography>
                ),
                programa: (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                        {element?.programa ?? "Sin especificar"}
                    </SoftTypography>
                ),
                action: (
                    <>
                        <Tooltip title="Ver detalle" placement="top">
                            <Icon
                                fontSize="small"
                                color="dark"
                                id={element.id}
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                    verDetalles(element);
                                }}
                            >
                                visibility
                            </Icon>
                        </Tooltip>
                        <Link to="/concurrentes/editar" state={{ element }}>
                            <Icon fontSize="small" color="primary" id={element.id} sx={{ cursor: "pointer", mx: 1 }}>
                                edit
                            </Icon>
                        </Link>
                        <Icon
                            fontSize="small"
                            id={element.id}
                            sx={{ cursor: "pointer", color: indigo[900] }}
                            onClick={handleDelete}
                        >
                            delete
                        </Icon>
                    </>
                ),
            };
            arrayRows.push(newItem);
        });
        return arrayRows;
    };

    const handleDelete = (e) => {
        setPost(concurrentes.find((cliente) => cliente.id === parseInt(e.target.id)));
        handleOpenModalDelete();
    };

    const verDetalles = (e) => {
        setDetallesConcurrente(e);
        setModalDetalles(true);
    }

    const getConcurrentes = async () => {
        setLoading(true);
        try {
            const promesa = await axios.get(urlBase + "concurrentes_page?page=" + pagina);
            if (promesa.data) {
                if (promesa.data.data.length < 1) {
                    setDatosVacios(true);
                }
                setConcurrentes(promesa.data.data);
                setCantidadPaginas(promesa.data.meta.last_page);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleCloseModalDelete = () => {
        setModalDelete(false);
    };

    const handleOpenModalDelete = () => {
        setModalDelete(true);
    };

    useEffect(() => {
        if (concurrentes.length != 0) {
            setDatosVacios(false);
            setRow(getRows(concurrentes));
        }
    }, [concurrentes]);

    //paginacion
    const handlePagination = (event, value) => {
        setPagina(value);
    };

    useEffect(() => {
        if (concurrenteABuscar.length > 0) {
            searchConcurrente(concurrenteABuscar);
        } else {
            getConcurrentes();
        }
    }, [pagina]);

    useEffect(() => {
        if (filtro === "") {
            setPagina(1);
            getConcurrentes();
            setConcurrenteABuscar("");
        }
    }, [filtro]);

    //buscardor
    const handleFiltro = (e) => {
        setFiltro(e.target.value);
    }

    const handleSearch = () => {
        setPagina(1);
        setConcurrenteABuscar(filtro);
        searchConcurrente(filtro);
    };

    const searchConcurrente = async (searchText) => {
        setLoading(true);
        try {
            const promesa = await axios.get(urlBase + "searchConcurrentes/" + searchText + "?page=" + pagina);
            if (promesa.data) {
                if (promesa.data.data.length < 1) {
                    setDatosVacios(true);
                }
                setConcurrentes(promesa.data.data);
                setCantidadPaginas(promesa.data.meta.last_page);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    <Card>
                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <SoftTypography variant="h6">Incidentes</SoftTypography>
                            <SoftBox display="flex" justifyContent="end" alignItems="center" py={3}>
                                <SoftBox mr={2}>
                                    <SoftInput
                                        placeholder="Buscar..."
                                        icon={{ component: "search", direction: "left" }}
                                        onChange={handleFiltro}
                                        value={filtro}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSearch();
                                            }
                                        }}
                                    />
                                </SoftBox>
                                <SoftBox sx={{ mr: 2 }}>
                                    <SoftButton
                                        variant="gradient"
                                        color="primary"
                                        onClick={() => setModaNomencladorOpen(true)}
                                    >
                                        <Icon>add</Icon>&nbsp; Valor Nomenclador
                                    </SoftButton>
                                </SoftBox>
                                <SoftBox>
                                    <Link to="/concurrentes/nuevo">
                                        <SoftButton variant="gradient" color="dark">
                                            <Icon>add</Icon>&nbsp; Agregar
                                        </SoftButton>
                                    </Link>
                                </SoftBox>
                            </SoftBox>
                        </SoftBox>
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
                                {!datosVacios ? (
                                    <Table columns={columns} rows={row} />
                                ) : (
                                    <Grid container justifyContent="center" alignItems="center" py={3}>
                                        <Grid item pb={3}>
                                            <SoftTypography variant="caption" color="text">
                                                No hay datos cargados
                                            </SoftTypography>
                                        </Grid>
                                    </Grid>
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
        </DashboardLayout>
    );
}

export default Incidentes;
