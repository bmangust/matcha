import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

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
export const borderRadius = "30px";

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
    MuiBadge: {
      anchorOriginTopRightCircle: {
        top: "23%",
        right: "33%",
        transform: "scale(1.5) translate(50%, -50%)",
        border: `1px solid ${backgroundColor.foreground}`,
      },
    },
    // MuiBottomNavigation: {
    //   root: {
    //     position: "fixed",
    //     left: 0,
    //     bottom: 0,
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   },
    // },
  },
  shape: {
    borderRadius: borderRadius,
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
    MuiAlert: {
      elevation: 6,
      variant: "filled",
    },
  },
});
