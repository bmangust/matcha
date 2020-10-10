import React from "react";
import { Box } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
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
