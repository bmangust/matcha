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
    padding: "1rem",
  },
  Category: {
    fontSize: "1rem",
    fontWeight: 700,
  },
});

const Header = ({ header, notification }) => {
  const classes = useStyles();
  const allUsers = useSelector((state) => state.users.users);
  const [users, setUsers] = useState([]);
  const loc = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    dispatch(loadUsers(notification));
  }, [dispatch, notification]);

  useEffect(() => {
    if (!notification) return;
    const users = allUsers.filter((user) =>
      [...notification].includes(user.id)
    );
    if (users) setUsers(users);
  }, [allUsers, notification]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleBackButton = () => {
    const parent = loc.pathname.split("/")[1];
    dispatch(handleBack(history, parent));
  };

  //show backbutton only if we're in submenu
  const showBackButton = loc.pathname.split("/").length > 2;

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

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
                badgeContent={notification || 0}
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
                      Visitors
                    </Typography>
                    <ClickAwayListener onClickAway={handleClose}>
                      <ClickableUsersList
                        users={users}
                        autoFocusItem={open}
                        setOpen={setOpen}
                      />
                    </ClickAwayListener>
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
    PropTypes.instanceOf(Set),
    // PropTypes.shape({
    //   id: PropTypes.string,
    //   avatarImg: PropTypes.string,
    //   username: PropTypes.string,
    // }),
    PropTypes.oneOf([null]),
  ]),
};

export default Header;
