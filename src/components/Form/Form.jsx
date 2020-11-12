import React from "react";
import { Button, List, ListItem, makeStyles } from "@material-ui/core";
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
});
const Form = (props) => {
  const classes = useStyles();
  const { inputs, buttons } = { ...props };

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
            {buttons.map(({ variant, type, text, onClick, ...others }) => (
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
            ))}
          </ListItem>
        )}
      </List>
    </form>
  );
};

export default Form;
