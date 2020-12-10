import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  SingleForm: {
    width: "70vw",
    height: "100vh",
    margin: "0 auto",
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "600px !important",
    },
  },
  label: {
    textTransform: "none",
  },
}));
