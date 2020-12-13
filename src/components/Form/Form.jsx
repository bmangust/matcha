import React, { useContext } from "react";
import {
  Button,
  Fab,
  List,
  ListItem,
  makeStyles,
  useTheme,
  Zoom,
} from "@material-ui/core";
import Input from "../Input/Input";
import { TabContext } from "../../pages/Profile/Profile";

const useStyles = makeStyles({
  Form: {
    width: "100%",
  },
  Button: {
    margin: "8px",
  },
  List: {
    width: "100%",
  },
  Buttons: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  Fab: {
    position: "fixed",
    right: "10vw",
    bottom: "4rem",
  },
});

const Form = ({ inputs, buttons }) => {
  const classes = useStyles();
  const theme = useTheme();
  const currentTab = useContext(TabContext);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <form className={classes.Form}>
      <List className={classes.List}>
        {inputs.map((el) => (
          <ListItem key={el.name || el.type}>
            <Input {...el} />
          </ListItem>
        ))}
        {buttons && (
          <ListItem className={classes.Buttons}>
            {buttons.map(
              ({ component, variant, type, text, onClick, ...others }) =>
                component === "fab" ? (
                  // <Zoom
                  //   key={text}
                  //   in={currentTab === 0}
                  //   timeout={transitionDuration}
                  //   style={{
                  //     transitionDelay: `${
                  //       currentTab === 0 ? transitionDuration.exit : 0
                  //     }ms`,
                  //   }}
                  //   unmountOnExit
                  // >
                  <Fab
                    color="primary"
                    key={text}
                    className={classes.Fab}
                    variant={variant}
                    type={type}
                    onClick={onClick}
                    {...others}
                  >
                    {text}
                  </Fab>
                ) : (
                  // </Zoom>
                  <Button
                    key={text}
                    className={classes.Button}
                    variant={variant}
                    type={type}
                    onClick={onClick}
                    {...others}
                  >
                    {text}
                  </Button>
                )
            )}
          </ListItem>
        )}
      </List>
    </form>
  );
};

export default Form;
