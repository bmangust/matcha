import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useSnackbar, SnackbarContent } from "notistack";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const getColor = (variant) => {
  const color = {
    background: "11B066",
    text: "#FFF",
  };
  if (variant === "success") color.background = "#11B066";
  else if (variant === "error") color.background = "#A50316";
  else if (variant === "warning") color.background = "#F29E4C";
  else if (variant === "info") color.background = "#048BA8";
  if (variant === "warning") color.text = "#000";
  console.log(color);
  return color;
};

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      minWidth: "344px !important",
    },
  },
  card: {
    backgroundColor: theme.background,
    width: "100%",
  },
  typography: {
    fontWeight: "bold",
    color: theme.color,
  },
  actionRoot: {
    padding: "8px 8px 8px 16px",
  },
  close: {
    marginLeft: "auto !important",
  },
  subMessage: {
    fontSize: "1rem",
    color: theme.color,
  },
}));

const SnackMessage = React.forwardRef((props, ref) => {
  const theme = useTheme();
  console.log(theme);
  const color = getColor(props.variant);
  const classes = useStyles({ ...theme, ...color });
  const { closeSnackbar } = useSnackbar();
  const message = props.message.message || props.message;
  const id = props.message.id || props.message;
  const subMessage = props.message.subMessage || null;
  console.log(props);

  const handleDismiss = () => {
    closeSnackbar(id);
  };

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          <Typography variant="subtitle2" className={classes.typography}>
            {message}
          </Typography>
          {subMessage && (
            <Typography variant="body" className={classes.subMessage}>
              {subMessage}
            </Typography>
          )}
          <IconButton className={classes.close} onClick={handleDismiss}>
            <CloseIcon />
          </IconButton>
        </CardActions>
      </Card>
    </SnackbarContent>
  );
});

export default SnackMessage;
