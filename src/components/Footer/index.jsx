// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Kaizen Dashboard components
import SoftBox from "../SoftBox";
import SoftTypography from "../SoftTypography";

// Kaizen Dashboard base styles
import typography from "../../assets/theme/base/typography";
import { version } from "../../services/config";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <SoftBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <SoftTypography variant="button" fontWeight="regular" color="text">
            {link.name === "Version " + version ? (
              <SoftTypography variant="button" fontWeight="medium">
                {link.name}
              </SoftTypography>
            ) : (
              link.name
            )}
          </SoftTypography>
        </Link>
      </SoftBox>
    ));

  return (
    <SoftBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, created by
        <Link href={href} target="_blank">
          <SoftTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </SoftTypography>
        </Link>
      </SoftBox>
      <SoftBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "kaizensoftware.com.ar", name: "Kaizen Software Factory" },
  links: [
    { href: "kaizensoftware.com.ar", name: "Kaizen Software Factory" },
    { href: "kaizensoftware.com.ar", name: "Sobre nosotros" },
    { href: "kaizensoftware.com.ar", name: "Team" },
    // { href: "kaizensoftware.com.ar", name: "Version " + version },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
