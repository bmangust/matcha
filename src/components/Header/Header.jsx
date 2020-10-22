import {
  Badge,
  Button,
  Grid,
  Typography,
  makeStyles,
  Popper,
  Paper,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Avatar,
  Fade,
} from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { api, media } from "../../axios";
import { handleBack } from "../../store/UISlice";
import { primaryColor } from "../../theme";

const useStyles = makeStyles({
  Header: {
    textAlign: "center",
    fontFamily: "Righteous",
    color: primaryColor.dark,
  },
  Popper: {
    zIndex: 5,
    textAlign: "center",
  },
  PopperPaper: {
    padding: "1rem",
  },
  Avatar: {
    marginRight: "1rem",
  },
});

const Header = (props) => {
  const classes = useStyles();
  const { header, notification } = {
    ...props,
  };
  const loc = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(null);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const fetchUsers = useCallback((users) => {
    console.log(users);
    const promises = [...users].map((el) => api.get(`/data/${el}`));
    const fetchedUsers = [];
    Promise.allSettled(promises)
      .then((values) => {
        values.forEach(async (el) => {
          if (el.status === "fulfilled") {
            const data = el.value.data.data;
            console.log(data);
            const avatarId = data.avatar || (data.images && data.images[0]);
            const avatar =
              avatarId &&
              (await media(avatarId)
                .then((res) => URL.createObjectURL(res.data))
                .catch((err) => {
                  console.log(err);
                  return null;
                }));
            const user = { id: data.id, username: data.username, avatar };
            fetchedUsers.push(user);
          }
        });
      })
      .catch((err) => console.log(err));
    return fetchedUsers;
  }, []);

  useEffect(() => {
    if (!notification) return;
    const users = fetchUsers(notification);
    console.log(users);
    setPopup(users);
  }, [notification, fetchUsers]);

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

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Grid container item spacing={1}>
      <Grid item xs={1}>
        {showBackButton ? (
          <Button variant="text" color="inherit" onClick={handleBackButton}>
            <ChevronLeftRounded
              style={{ color: primaryColor.dark }}
              fontSize="large"
            />
          </Button>
        ) : null}
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h4" className={classes.Header}>
          {header}
        </Typography>
      </Grid>
      <Grid item xs={1}>
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
                <Typography variant="h6">Visitors</Typography>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {popup &&
                      popup.map((el) => (
                        <MenuItem key={el.id}>
                          <Grid container alignItems="center">
                            <Avatar
                              className={classes.Avatar}
                              src={el.avatar || null}
                            />
                            <Typography>{el.username}</Typography>
                          </Grid>
                        </MenuItem>
                      ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};

export default Header;
