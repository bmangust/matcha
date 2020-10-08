import { createMuiTheme } from "@material-ui/core/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import pink from "@material-ui/core/colors/pink";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[900],
    },
    secondary: {
      main: pink[400],
    },
  },
  override: {
    MuiButton: {
      variant: "outlined",
      color: "primary",
      size: "large",
    },
  },
  shape: {
    borderRadius: 30,
  },
  spacing: 5,
});
