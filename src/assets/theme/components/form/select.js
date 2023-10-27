

// Kaizen Dashboard base styles
import colors from "../../base/colors";

// Kaizen Dashboard helper functions
import pxToRem from "../../functions/pxToRem";

const { transparent } = colors;

const select = {
  styleOverrides: {
    select: {
      display: "grid",
      alignItems: "center",
      padding: `0 ${pxToRem(12)} !important`,

      "& .Mui-selected": {
        backgroundColor: transparent.main,
      },
      minWidth: "100%",
    },

    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    },

  },
};

export default select;
