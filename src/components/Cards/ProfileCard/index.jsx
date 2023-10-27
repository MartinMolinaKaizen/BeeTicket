import { useContext } from "react";
import PropTypes from "prop-types";

// @mui material components
import { Card, Divider, Icon, Skeleton, Tooltip } from "@mui/material/";
import Button from "@mui/material/Button";

// Kaizen Dashboard components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { API_URL } from "services/config";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

import { MessageManager } from "context";

function ProfileCard({ color, empleado, setEmpleado, loading }) {
  const { handleSnackbar } = useContext(MessageManager);
  const copyOnClick = (e) => {
    navigator.clipboard.writeText(e.target.innerText);
    handleSnackbar("Copiado al portapapeles", "success");
  };

  const handleVerCarnet = () => {
    window.open(`${API_URL}/${empleado.fileCarnet}`, "_blank");
  };

  return (
    <Card sx={{ marginBottom: 2 }}>
      <SoftBox p={2} mx={3} display="flex" justifyContent="center">
        {loading ? (
          <Skeleton>
            <SoftBox
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor={color}
              color="white"
              width="8rem"
              height="8rem"
              shadow="md"
              borderRadius="lg"
              variant="gradient"
            ></SoftBox>
          </Skeleton>
        ) : (
          <SoftBox display="flex" justifyContent="center" alignItems="center" py={2}>
            <SoftAvatar
                display="grid"
                justifyContent="center"
                alignItems="center"
                bgColor={color}
                color="white"
                width="8rem"
                height="8rem"
                shadow="md"
                borderRadius="lg"
                variant="rounded"
                src={empleado.foto ? `${API_URL}/${empleado.foto}` : null}
                size="xxl"
              />
          </SoftBox>
        )}
      </SoftBox>
      <SoftBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {loading ? (
            <SoftBox sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
            </SoftBox>
          ) : (
            empleado.nombre + " " + empleado.apellido
          )}
        </SoftTypography>
        <SoftTypography variant="caption" color="text" fontWeight="regular">
          {loading ? (
            <SoftBox sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Skeleton variant="text" width={100} sx={{ fontSize: "0.5rem" }} />
            </SoftBox>
          ) : empleado.puesto ? (
            empleado.puesto.nombre
          ) : (
            "Sin puesto"
          )}
        </SoftTypography>
        <Divider />
        {empleado.legajo && (
          <Tooltip title={"Número de legajo"} placement="top">
            {loading ? (
              <Skeleton width={"100%"} />
            ) : (
              <Button
                variant="text"
                color="secondary"
                sx={{ textTransform: "lowercase" }}
                fullWidth
                size="small"
                onClick={copyOnClick}
              >
                <Icon>description</Icon>&nbsp;&nbsp;
                <SoftTypography variant="caption" fontWeight="regular">
                  {empleado.legajo}
                </SoftTypography>
              </Button>
            )}
          </Tooltip>
        )}
        {empleado.contratacion && (
          <Tooltip title={"Tipo de empleado"} placement="top">
            {loading ? (
              <Skeleton width={"100%"} />
            ) : (
              <Button
                variant="text"
                color="secondary"
                sx={{ textTransform: "lowercase" }}
                fullWidth
                size="small"
                onClick={copyOnClick}
              >
                <Icon>work</Icon>&nbsp;&nbsp;
                <SoftTypography variant="caption" fontWeight="regular">
                  {empleado.contratacion}
                </SoftTypography>
              </Button>
            )}
          </Tooltip>
        )}
        <Tooltip title={"Sucursales"} placement="top">
          {loading ? (
            <Skeleton width={"100%"} />
          ) : (
            <Button
              variant="text"
              color="secondary"
              sx={{ textTransform: "lowercase" }}
              fullWidth
              size="small"
              onClick={copyOnClick}
            >
              <Icon>apartment</Icon>&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="regular">
                {empleado.sucursales.map((sucursal) => sucursal.nombre).join(", ")}
              </SoftTypography>
            </Button>
          )}
        </Tooltip>
        <Tooltip title={"Email personal"} placement="top">
          {loading ? (
            <Skeleton width={"100%"} />
          ) : (
            <Button
              variant="text"
              color="secondary"
              sx={{ textTransform: "lowercase" }}
              fullWidth
              size="small"
              onClick={copyOnClick}
            >
              <Icon>mail</Icon>&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="regular">
                {empleado.user.email}
              </SoftTypography>
            </Button>
          )}
        </Tooltip>
        <Tooltip title={"CUIL"} placement="top">
          {loading ? (
            <Skeleton width={"100%"} />
          ) : (
            <Button
              variant="text"
              color="secondary"
              sx={{ textTransform: "lowercase" }}
              fullWidth
              size="small"
              onClick={copyOnClick}
            >
              <Icon>badge</Icon>&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="regular">
                {empleado.cuil}
              </SoftTypography>
            </Button>
          )}
        </Tooltip>
        <Tooltip title={"Fecha de nacimiento"} placement="top">
          {loading ? (
            <Skeleton width={"100%"} />
          ) : (
            <Button
              variant="text"
              color="secondary"
              sx={{ textTransform: "lowercase" }}
              fullWidth
              size="small"
              onClick={copyOnClick}
            >
              <Icon>cake</Icon>&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="regular">
                {empleado.nacimiento}
              </SoftTypography>
            </Button>
          )}
        </Tooltip>
        <Tooltip title={"Dirección"} placement="top">
          {loading ? (
            <Skeleton width={"100%"} />
          ) : (
            <Button
              variant="text"
              color="secondary"
              sx={{ textTransform: "lowercase" }}
              fullWidth
              size="small"
              onClick={copyOnClick}
            >
              <Icon>home</Icon>&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="regular">
                {empleado.domicilio +
                  ", " +
                  empleado.localidad.nombre +
                  ", " +
                  empleado.localidad.provincia.nombre}
              </SoftTypography>
            </Button>
          )}
        </Tooltip>
        <Tooltip title={"Teléfono personal"} placement="top">
          {loading ? (
            <Skeleton width={"100%"} />
          ) : (
            <Button
              variant="text"
              color="secondary"
              sx={{ textTransform: "lowercase" }}
              fullWidth
              size="small"
              onClick={copyOnClick}
            >
              <Icon>call</Icon>&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="regular">
                {empleado.telefono}
              </SoftTypography>
            </Button>
          )}
        </Tooltip>
        {empleado.telefonoEmergencia && (
          <Tooltip title={"Teléfono de emergencia"} placement="top">
            {loading ? (
              <Skeleton width={"100%"} />
            ) : (
              <Button
                variant="text"
                color="secondary"
                sx={{ textTransform: "lowercase" }}
                fullWidth
                size="small"
                onClick={copyOnClick}
              >
                <Icon>emergency</Icon>&nbsp;&nbsp;
                <SoftTypography variant="caption" fontWeight="regular">
                  {empleado.telefonoEmergencia}
                </SoftTypography>
              </Button>
            )}
          </Tooltip>
        )}
        {empleado.observaciones && (
          <>
            <Divider />
            <SoftTypography variant="caption" fontWeight="regular">
              {empleado.observaciones}
            </SoftTypography>
          </>
        )}
        {empleado.fileCarnet && (
          <Tooltip title={"Carnet de conducir"} placement="top">
            {loading ? (
              <Skeleton width={"100%"} />
            ) : (
              <Button
                variant="text"
                color="secondary"
                sx={{ textTransform: "lowercase" }}
                fullWidth
                size="small"
                onClick={handleVerCarnet}
              >
                <Icon>directions_car</Icon>&nbsp;&nbsp;
                <SoftTypography variant="caption" fontWeight="regular">
                  Ver carnet
                </SoftTypography>
              </Button>
            )}
          </Tooltip>
        )}
      </SoftBox>
    </Card>
  );
}

// Setting default values for the props of ProfileCard
ProfileCard.defaultProps = {
  color: "primary",
  empleado: {
    sucursal: {},
    puesto: {},
    user: {},
    localidad: { provincia: {} },
    sucursales: [{}],
  },
  setEmpleado: () => {},
  loading: true,
};

// Typechecking props for the ProfileCard
ProfileCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  empleado: PropTypes.object.isRequired,
  setEmpleado: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default ProfileCard;
