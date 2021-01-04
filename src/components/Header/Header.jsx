import {
  Badge,
  Button,
  Grid,
  Typography,
  makeStyles,
  Popper,
  Paper,
  ClickAwayListener,
  Fade,
  AppBar,
} from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React, { useEffect, useRef, useState, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { handleBack } from "../../store/UISlice";
import { backgroundColor, primaryColor } from "../../theme";
import PropTypes from "prop-types";
import { loadUsers } from "../../store/usersSlice";
import ClickableUsersList from "../ClickableUsersList/ClickableUsersList";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { setAdditionalState } from "../../pages/AdditionalInfo/additionalSlice";
import { CONSTANTS } from "../../models/ws";
import { readAllNotifications } from "../../store/WSSlice";

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles({
  Appbar: {
    paddingTop: "10px",
    backgroundColor: backgroundColor.background,
  },
  Header: {
    textAlign: "center",
    fontFamily: "Righteous",
    color: primaryColor.dark,
    fontSize: "2rem",
    textTransform: "capitalize",
  },
  Popper: {
    zIndex: 5,
    textAlign: "center",
  },
  PopperPaper: {
    padding: "1rem 1.5rem",
  },
  Notifications: {
    overflowY: "scroll",
    maxHeight: 500,
    scrollbarWidth: "none",
    "&hover": {
      scrollbarWidth: "auto",
    },
    "&:hover>&::-webkit-scrollbar": {
      opacity: 1,
    },
    "&::-webkit-scrollbar": {
      width: 3,
      opacity: 0,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 3,
    },
  },
  Category: {
    fontSize: "1rem",
    fontWeight: 700,
  },
  Button: {
    marginLeft: 20,
  },
});

const Header = ({ header }) => {
  const classes = useStyles();
  const allUsers = useSelector((state) => state.users.users);
  const general = useSelector((state) => state.general);
  const { notifications } = useSelector((state) => state.WS);
  const [filledNotifications, setFilledNotifications] = useState(null);
  const loc = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    const usersIds = notifications.map((el) => el.userId);
    dispatch(loadUsers(usersIds));
  }, [dispatch, notifications]);

  useEffect(() => {
    if (!notifications || !notifications.length) return;
    const filledNotifications = notifications
      .map((notification) => {
        const user = allUsers.find((user) => user.id === notification.userId);
        return { ...notification, user };
      })
      .reverse();
    if (filledNotifications) setFilledNotifications(filledNotifications);
  }, [allUsers, notifications]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleBackButton = () => {
    const parent = loc.pathname.split("/")[1];
    if (parent === "profile") {
      dispatch(setAdditionalState(general));
    }
    dispatch(handleBack(history, parent));
  };

  const readAll = () => {
    dispatch(readAllNotifications());
  };

  //show backbutton only if we're in submenu
  const showBackButton = loc.pathname.split("/").length > 2;

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const unreadNotifications =
    filledNotifications && filledNotifications.length
      ? filledNotifications.reduce(
          (acc, cur) =>
            acc + (cur.status === CONSTANTS.UPDATE_STATUS.NEW ? 1 : 0),
          0
        )
      : 0;

  return (
    <ElevationScroll>
      <AppBar className={classes.Appbar}>
        <Grid container justify="space-around" alignItems="center" item>
          <Grid item xs={2}>
            {showBackButton ? (
              <Button variant="text" color="inherit" onClick={handleBackButton}>
                <ChevronLeftRounded
                  style={{ color: primaryColor.dark }}
                  fontSize="large"
                />
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h1" className={classes.Header}>
              {header}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              ref={anchorRef}
              variant="text"
              color="inherit"
              onClick={handleToggle}
            >
              <Badge
                color="secondary"
                overlap="circle"
                variant="dot"
                badgeContent={unreadNotifications}
              >
                <NotificationsIcon
                  style={{ color: primaryColor.dark }}
                  fontSize="large"
                />
              </Badge>
            </Button>
            <Popper
              className={classes.Popper}
              open={open}
              anchorEl={anchorRef.current}
              placement="left"
              transition
              disablePortal
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps}>
                  <Paper className={classes.PopperPaper}>
                    <Typography className={classes.Category}>
                      Notifications
                    </Typography>
                    {filledNotifications ? (
                      <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.Notifications}
                      >
                        <ClickAwayListener onClickAway={handleClose}>
                          <ClickableUsersList
                            items={filledNotifications}
                            autoFocusItem={open}
                            setOpen={setOpen}
                          />
                        </ClickAwayListener>
                        <Button
                          size="small"
                          onClick={readAll}
                          className={classes.Button}
                        >
                          Read all
                        </Button>
                      </Grid>
                    ) : (
                      <Typography>No recent actions yet</Typography>
                    )}
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Grid>
        </Grid>
      </AppBar>
    </ElevationScroll>
  );
};

Header.propTypes = {
  header: PropTypes.string,
  notification: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    // PropTypes.shape({
    //   id: PropTypes.string,
    //   avatarImg: PropTypes.string,
    //   username: PropTypes.string,
    // }),
    PropTypes.oneOf([null]),
  ]),
};

export default Header;
