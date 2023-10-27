// prop-types is library for typechecking of props
import PropTypes from "prop-types";
import { useState } from "react";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { Input } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

// Kaizen Dashboard components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function InfoCard({ color, icon, title, description, value }) {
  // create a state for the image
  const [image, setImage] = useState("");

  const toggleInput = () => {
    document.getElementById("input-image").click();
  };

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <SoftBox p={2} mx={3} display="flex" justifyContent="center">
        <Tooltip title="Agregar imagen" placement="top">
          <SoftBox
            display="grid"
            justifyContent="center"
            alignItems="center"
            bgColor={color}
            color="white"
            width="4rem"
            height="4rem"
            shadow="md"
            borderRadius="lg"
            variant="gradient"
            onClick={toggleInput}
            sx={
              image !== ""
                ? {
                    cursor: "pointer",
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : { cursor: "pointer" }
            }
          >
            {image === "" && <Icon fontSize="default">{icon}</Icon>}
          </SoftBox>
        </Tooltip>
        <SoftBox ml={3} sx={{ display: "none" }}>
          <Input type="file" id="input-image" onChange={handleImage} />
        </SoftBox>
      </SoftBox>
      <SoftBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
        {description && (
          <SoftTypography variant="caption" color="text" fontWeight="regular">
            {description}
          </SoftTypography>
        )}
        {description && !value ? null : <Divider />}
        {value && (
          <SoftTypography variant="h5" fontWeight="medium">
            {value}
          </SoftTypography>
        )}
      </SoftBox>
    </>
  );
}

// Setting default values for the props of InfoCard
InfoCard.defaultProps = {
  color: "primary",
  value: "",
  description: "",
};

// Typechecking props for the InfoCard
InfoCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default InfoCard;
