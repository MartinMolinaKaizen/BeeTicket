import { useEffect, useState } from "react";
import axios from "axios";
// react-router-dom components
import { Link } from "react-router-dom";
import routes from "../../../routes";
// @mui material components
import Switch from "@mui/material/Switch";

// Kaizen Dashboard components
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";
import SoftButton from "../../../components/SoftButton";
import CircularProgress from "@mui/material/CircularProgress";

import { urlBase, rolesConAcceso } from "../../../services/config";

// Authentication layout components
import CoverLayout from "../components/CoverLayout";

// Images
import curved9 from "../../../assets/images/images/background01.jpg"

function SignIn() {
  // const sha512 = require("js-sha512");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorLogin, setErrorLogin] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleChanges = (event) => {
    setErrorLogin(null);
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    //setErrorLogin(null);
    setLoading(true);
    if (username !== "" && password !== "") {
      setEmptyFields(false);
      const variables = {
        user: username,
        password: password,
      };

      axios
        .post(urlBase + "login", variables)
        .then((res) => {
          const user = {
            user: username,
            password: password,
            token: res.data.token,
          };

          if (res.data.token !== null) {
            axios
              .get(urlBase + "user-profile", {
                headers: { Authorization: `Bearer ${user.token}` },
              })
              .then((res) => {
                // const user_profile = {
                //   id: res.data.userData.id,
                //   user: res.data.userData.name,
                //   adminKey: adminKey,
                //   token: user.token,
                //   id_rol: res.data.userData.id_rol,
                //   idProfesional: res.data.idProfesional,
                // };

                const user_profile = {
                  ...res.data.userData,
                  idProfesional: res.data.idProfesional,
                };

                if (user_profile) {
                  if (rememberMe) {
                    if (user_profile.id === "7") {
                      localStorage.setItem("user", JSON.stringify(user_profile));
                      window.location.href = "/incidentes";
                    } else {
                      localStorage.setItem("user", JSON.stringify(user_profile));
                    }
                  } else {
                    sessionStorage.setItem("user", JSON.stringify(user_profile));
                  }

                  const userRoutes = routes.filter((route) =>
                    route.access?.includes(user_profile.id_rol)
                  );
                  if (user_profile.id_rol && rolesConAcceso.includes(user_profile.id_rol)) {
                    window.location.href = userRoutes[0].route;
                  } else {
                    window.location.href = "/incidentes";
                  }
                }
              });
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            setErrorLogin("Usuario o contraseña incorrectos");
          } else {
            setErrorLogin("Error al iniciar sesión");
          }
          setLoading(false);
        });
    } else {
      setEmptyFields(true);
      setLoading(false);
    }

  };

  useEffect(() => {
    if (username.length > 0 && password.length > 0) {
      setEmptyFields(false);
    }
  }, [username, password]);

  return (
    <CoverLayout
      title="Bienvenido"
      description="Ingrese su usuario y contraseña para iniciar sesión"
      image={curved9}
    >
      <SoftBox component="form" role="form" autoComplete="off">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Usuario
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="text"
            placeholder="Usuario"
            name="username"
            value={username}
            onChange={handleChanges}
            // error={data && data.authenticateUser === null}
            autoComplete="new-password"
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Contraseña
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={handleChanges}
            // error={data && data.authenticateUser === null}
            autoComplete="new-password"
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Mantenerme conectado
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton
            type="submit"
            variant="gradient"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress color="inherit" size={20} /> : "Iniciar sesión"}
            {/* Iniciar sesión */}
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} display="flex" justifyContent="center" alignItems="center">
          {emptyFields && (
            <SoftTypography variant="h6" color="error" fontWeight="bold">
              Debes ingresar un usuario y contraseña
            </SoftTypography>
          )}
          {!emptyFields && errorLogin && (
            <SoftTypography variant="h6" color="error" fontWeight="bold">
              {errorLogin}
            </SoftTypography>
          )}
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Olvidaste tu contraseña?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="primary"
              fontWeight="medium"
              textGradient
            >
              Hace click aquí
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;

