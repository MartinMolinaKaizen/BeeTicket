

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

// Kaizen Dashboard components
import SoftBox from "components/SoftBox";

// Custom styles for the SoftAlert
import SoftAlertRoot from "components/SoftAlert/SoftAlertRoot";
import SoftAlertCloseIcon from "components/SoftAlert/SoftAlertCloseIcon";

function SoftAlert({ color, dismissible, children, time, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert

  // if time is set, the alert will be automatically closed after the time is over
  if (time && time > 0) {
    setTimeout(() => {
      if (alertStatus === "mount") {
        handleAlertStatus();
      }
    }, time);
  }

  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <SoftAlertRoot ownerState={{ color }} {...rest}>
        <SoftBox display="flex" alignItems="center" color="white">
          {children}
        </SoftBox>
        {dismissible ? (
          <SoftAlertCloseIcon onClick={mount ? handleAlertStatus : null}>
            &times;
          </SoftAlertCloseIcon>
        ) : null}
      </SoftAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of SoftAlert
SoftAlert.defaultProps = {
  color: "primary",
  dismissible: false,
  time: 0,
};

// Typechecking props of the SoftAlert
SoftAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
  time: PropTypes.number,
};

export default SoftAlert;
