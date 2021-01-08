import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar, SnackbarContent } from "notistack";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import { CheckRounded } from "@material-ui/icons";
import { getLocationByIp, useGPS } from "../../../hooks/useGPS.hook";
import { setNewState } from "../../../store/generalSlice";
import {
  changeUseLocation,
  updateInfo,
} from "../../../pages/AdditionalInfo/additionalSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      minWidth: "344px !important",
    },
  },
  card: {
    display: "flex",
    width: "100%",
  },
  default: {
    backgroundColor: theme.palette.grey[800],
  },
  prompt: {
    backgroundColor: theme.palette.grey[800],
    width: 550,
  },
  info: {
    backgroundColor: theme.palette.info.main,
  },
  success: {
    backgroundColor: theme.palette.success.main,
  },
  warning: {
    backgroundColor: theme.palette.warning.dark,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  header: {
    display: "block",
    fontWeight: "bold",
    color: theme.palette.common.white,
  },
  actionRoot: {
    padding: "8px 8px 8px 26px",
  },
  close: {
    marginLeft: "auto !important",
    color: theme.palette.common.white,
  },
  text: {
    fontSize: "1rem",
    color: theme.palette.common.white,
  },
}));

const SnackMessage = React.forwardRef(({ id }, ref) => {
  const classes = useStyles();
  const { getCurrentLocaion } = useGPS();
  const { closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.snack.notifications);
  const selected = notifications.find((el) => el.key === id);
  const { text, variant, header } = { ...selected };
  const isPrompt = variant === "prompt";

  const handleDismiss = () => {
    if (isPrompt) {
      dispatch(setNewState({ useLocation: false }));
      dispatch(changeUseLocation(false));
      dispatch(updateInfo({ useLocation: false }));
      getLocationByIp();
    }
    closeSnackbar(id);
  };

  const handleAccept = () => {
    dispatch(setNewState({ useLocation: true }));
    dispatch(changeUseLocation(true));
    dispatch(updateInfo({ useLocation: true }));
    getCurrentLocaion();
    closeSnackbar(id);
  };

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card className={classnames(classes.card, classes[variant])}>
        <CardActions classes={{ root: classes.actionRoot }}>
          {header && (
            <Typography variant="subtitle2" className={classes.header}>
              {header}:
            </Typography>
          )}
          {text && (
            <Typography variant="body1" className={classes.text}>
              {text}
            </Typography>
          )}
        </CardActions>

        {isPrompt && (
          <IconButton className={classes.close} onClick={handleAccept}>
            <CheckRounded color="inherit" />
          </IconButton>
        )}
        <IconButton className={classes.close} onClick={handleDismiss}>
          <CloseIcon color="inherit" />
        </IconButton>
      </Card>
    </SnackbarContent>
  );
});

export default SnackMessage;
