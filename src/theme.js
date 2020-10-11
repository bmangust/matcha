import { createMuiTheme } from "@material-ui/core/styles";

export const backgroundColor = {
  background: "#fafafa",
  foreground: "#fdfdfd",
};
export const primaryColor = {
  light: "#A8DADC",
  main: "#457B9D",
  dark: "#1D3557",
  contrastText: "#000",
};
export const secondaryColor = {
  light: "#E94957",
  main: "#E63946",
  dark: "#C81927",
  contrastText: "#fff",
};

export const theme = createMuiTheme({
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
  },
  overrides: {
    MuiTextField: {
      root: {
        width: "100%",
      },
    },
    MuiContainer: {
      root: {
        display: "flex",
        justifyContent: "center",
      },
    },
  },
  shape: {
    borderRadius: 30,
  },
  props: {
    MuiButton: {
      variant: "outlined",
      color: "primary",
      size: "large",
    },
    MuiTextField: {
      variant: "outlined",
    },
  },
});
