

// Kaizen Dashboard base styles
import borders from "../../base/borders";
import colors from "../../base/colors";

// Kaizen Dashboard helper functions
import pxToRem from "../../functions/pxToRem";

const { borderWidth } = borders;
const { light } = colors;

const tableCell = {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(16)}`,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
    },
  },
};

export default tableCell;
