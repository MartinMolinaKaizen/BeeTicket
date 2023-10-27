

// Kaizen Dashboard base styles
import typography from "../../base/typography";
import colors from "../../base/colors";

// Kaizen Dashboard helper functions
// import pxToRem from "../../functions/pxToRem";

const { size } = typography;
const { text } = colors;

const dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};

export default dialogContentText;
