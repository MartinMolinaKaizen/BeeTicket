// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Kaizen Dashboard base styles
import colors from "../../base/colors";

function Clock({ color, size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size}>
      <path d="M0 0h24v24H0z" fill="none"/>
      <title>clock</title>
      <g id="Basic-Elements" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Rounded-Icons"
          transform="translate(-1869.000000, -741.000000)"
          fill={colors[color] ? colors[color].main : colors.dark.main}
          fillRule="nonzero"
        >
          <g id="Icons-with-opacity" transform="translate(1716.000000, 291.000000)">
            <g id="clock" transform="translate(153.000000, 450.000000)">
              <path
                className="color-background"
                d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                opacity="1"
              />
              <path className="color-background" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Setting default values for the props of Clock
Clock.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Clock
Clock.propTypes = {
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
};

export default Clock;
