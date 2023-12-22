import { useState, useEffect, useContext } from "react";
import DeviceDetector from "device-detector-js";
import { rolesConAcceso, adminKey } from "./services/config";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Fade,
  Snackbar,
  Alert
} from "@mui/material";

// Kaizen Dashboard components
import SoftBox from "./components/SoftBox";

// Kaizen Dashboard examples
import Sidenav from "./components/Sidenav";
//import ErrorMessager from "components/ErrorMessager";

// Kaizen Dashboard themes
import theme from "./assets/theme";

// Kaizen Dashboard routes
import routes from "./routes.js";

// Kaizen Dashboard contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator, MessageManager } from "./context";
import { UserContext } from "./context/user";

// Images
import brand from "./assets/images/logo.png";
import SoftTypography from "./components/SoftTypography/index.jsx";

export default function App() {

  const [controller, dispatch] = useSoftUIController();
  const {
    snackbar,
    snackbarMessage,
    snackbarType,
    handleSnackbar,
    closeSnackbar,
    setSnackbarMessage,
  } = useContext(MessageManager);
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [loadingSpinner, setLoadingSpinner] = useState(true);
  const { logout } = useContext(UserContext);
  const [noAccess, setNoAccess] = useState(false);
  const [seconds, setSeconds] = useState(5);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  };


  useEffect(() => {
    setLoadingSpinner(false);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const deviceDetector = new DeviceDetector();
    const device = deviceDetector.parse(navigator.userAgent);

    if (!user) {
      if (pathname !== "/login") {
        logout();
      }
      return;
    }

    if (user.adminKey && user.adminKey === adminKey) {
      return;
    }

    const userRoutes = routes.filter((route) =>
      route.access?.includes(user.id_rol)
    );

    if (userRoutes.length === 0) {
      setNoAccess(true);
      setTimeout(() => {
        logout();
      }, 2500);
    }

    const currentRoute = routes.find((route) => route.route === pathname);

    if (currentRoute?.access) {
      if (!currentRoute || !currentRoute.access.includes(user.id_rol)) {
        if (device.device.type === "desktop") {
          window.location.href = userRoutes[0]?.route;
        } else {
          window.location.href = "/incidentes"
        }
      } else if (pathname === "/login") {
        window.location.href = userRoutes[0].route;
      }
    }

  }, [pathname, rolesConAcceso]);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    if (
      localStorage.getItem("user") === null &&
      sessionStorage.getItem("user") === null &&
      pathname !== "/login"
    ) {
      logout();
    } else if (
      (localStorage.getItem("user") !== null || sessionStorage.getItem("user") !== null) &&
      pathname === "/login"
    ) {
      logout();
    }
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        const Component = route.component;
        return (
          <Route exact path={route.route} element={<Component />} key={"route-" + route.key} />
        );
      }

      return null;
    });

  return loadingSpinner ? (
    <ThemeProvider theme={theme}>
      <SoftBox display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Fade in={loadingSpinner} appear={true} timeout={1000}>
          <CircularProgress />
        </Fade>
      </SoftBox>
    </ThemeProvider>
  ) : noAccess ? (
    <ThemeProvider theme={theme}>
      <SoftBox display="flex" justifyContent="center" alignItems="center" height="100vh">
        <SoftTypography variant="h3" color="text">
          Error: usuario sin acceso
        </SoftTypography>
      </SoftBox>
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarType} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <CssBaseline />
      {/* {layout === "dashboard" && (pathname !== "/login" && pathname !== "/empleado/perfil") && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Kaizen Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )} */}
      <Routes>
        {getRoutes(routes)}
        <Route
          path="*"
          element={
            <Navigate to="/incidentes" />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}
