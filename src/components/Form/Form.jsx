import React from "react";
import { Button, Fab, List, ListItem, makeStyles } from "@material-ui/core";
import Input from "../Input/Input";

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
    right: "2vw",
    bottom: "4rem",
    zIndex: 2,
  },
});

const Form = ({ inputs, buttons }) => {
  const classes = useStyles();

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
