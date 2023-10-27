// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Kaizen Dashboard base styles
import colors from "../../base/colors";
//import MaterialUi icon
import Icon from "@mui/material/Icon";

function CustomIcon({ color, size, icon }) {
  return (
    <Icon style={{ color: colors[color] ? colors[color].main : colors.dark.main, fontSize: size }}>
        {icon}
    </Icon>
  );
}

// Setting default values for the props of CustomIcon
CustomIcon.defaultProps = {
  color: "dark",
  size: "16px",
    icon: "access_time",
};

// Typechecking props for the CustomIcon
CustomIcon.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
icon: PropTypes.string.isRequired,
};

export default CustomIcon;
