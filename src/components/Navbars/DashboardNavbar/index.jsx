import { useState, useEffect, useContext } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Kaizen Dashboard components
import SoftBox from "../../SoftBox";
import SoftTypography from "../../SoftTypography";
import Logout from "../../Modals/Logout";
import ModalVersion from "../../Modals/Version";
import {version} from "../../../services/config";

// Kaizen Dashboard examples
import Breadcrumbs from "../../Breadcrumbs";
import NotificationItem from "../../Items/NotificationItem";
import brand from "../../../assets/images/logo.webp";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "../../Navbars/DashboardNavbar/styles";

// Kaizen Dashboard context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "../../../context";
import { UserContext } from "../../../context/user";

// Images
import team2 from "../../../assets/images/team-2.jpg";
import logoSpotify from "../../../assets/images/small-logos/logo-spotify.svg";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const {user, handleUser, logout} = useContext(UserContext);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const [openLogout, setOpenLogout] = useState(false);
  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleCloseVersion = () => {
    setOpenVersion(false);
    localStorage.setItem("novedades", JSON.stringify({version: version}));
    setVersionPantalla(version);
  };

  useEffect(() => {
    if(localStorage.getItem("novedades")){
      let novedades = JSON.parse(localStorage.getItem("novedades"));
      setVersionPantalla(novedades.version);
      if(novedades.version === version){
        setOpenVersion(false);
      }else{
        setOpenVersion(true);
      }        
    }else{
      setOpenVersion(true);
    }
  }, []);
  const [versionPantalla, setVersionPantalla] = useState("");
  const [openVersion, setOpenVersion] = useState(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={team2} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={logoSpotify} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white.main }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
        <SoftBox mr={2}>
        <SoftBox component="img" src={brand} alt="Kaizen Logo" width="200px" />
        </SoftBox>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox color={light ? "white" : "inherit"} sx={{ textAlign: "end" }}>
              <SoftBox display="flex" flexDirection="column" alignItems="flex-end" >
                
                <SoftTypography variant="button" fontWeight="medium">
                  Version {versionPantalla}
                </SoftTypography>

                <IconButton sx={navbarIconButton} size="small" onClick={handleOpenLogout}>
                  <Icon
                    sx={({ palette: { dark, white } }) => ({
                      color: light ? white.main : dark.main,
                    })}
                  >
                    logout
                  </Icon>
                  <SoftTypography
                    variant="button"
                    fontWeight="medium"
                    color={light ? "white" : "dark"}
                  >
                    Salir
                  </SoftTypography>
                </IconButton>

              </SoftBox>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {renderMenu()}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
      <Logout open={openLogout} handleClose={handleCloseLogout} btnFunction={() => logout()}/>
      <ModalVersion open={openVersion} handleClose={handleCloseVersion}/> 
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
