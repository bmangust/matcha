import { Grid, Fab, InputBase, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React from "react";
import { useSelector } from "react-redux";
import { useChat } from "../../../../hooks/useChat.hook";
import { backgroundColor } from "../../../../theme";

const useStyles = makeStyles({
  Wrapper: {
    border: "1px solid #ccc",
    borderRadius: "45px",
    padding: "10px",
    backgroundColor: backgroundColor.foreground,
  },
  Input: {
    flexGrow: 2,
    paddingLeft: "20px",
  },
  Send: {
    boxShadow: "none",
  },
  Icon: {
    transform: "rotate(-38deg) skew(17deg, 4deg) translateX(2px)",
  },
  Form: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SendForm = () => {
  const classes = useStyles();
  const [message, setMessage] = React.useState("");
  const id = useSelector((state) => state.UI.companion.id);
  const { newMessage } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    newMessage(id, message);
    setMessage("");
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid
        className={classes.Wrapper}
        container
        direction="row"
        justify="center"
        alignItems="center"
        item
        xs={10}
        sm={8}
      >
        <form onSubmit={handleSubmit} className={classes.Form}>
          <InputBase
            className={classes.Input}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Fab
            type="submit"
            className={classes.Send}
            size="small"
            color="secondary"
          >
            <SendIcon className={classes.Icon} />
          </Fab>
        </form>
      </Grid>
    </Grid>
  );
};

export default SendForm;
