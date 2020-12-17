import React from "react";
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "70%",
    textAlign: "center",
  },
  "@media (max-width: 960px)": {
    root: {
      width: "100%",
    },
  },
});

function TabPanel(props) {
  const classes = useStyles();
  const { children, value, index, ...other } = props;

  return (
    <Box
      className={classes.root}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      borderRadius={0}
      {...other}
    >
      {children}
    </Box>
  );
}

export default TabPanel;
