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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useFetchUsers } from "../../hooks/loadUsers.hook";
import { handleBack, setCompanion } from "../../store/UISlice";
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
  const [{ fetchedUsers }, fetchUsers] = useFetchUsers();
  const [users, setUsers] = useState([]);
  const loc = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    fetchUsers(notification);
  }, [notification]);

  useEffect(() => {
    setUsers(fetchedUsers);
  }, [fetchedUsers]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleItemClick = (id) => {
    const user = fetchedUsers.find((el) => el.id === id);
    dispatch(setCompanion({ companion: user }));
    history.push(`/strangers/${id}`);
    setOpen(false);
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
    <Grid container justify="space-around" item spacing={0}>
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
        <Typography variant="h4" className={classes.Header}>
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
                <Typography variant="h6">Visitors</Typography>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {users.length > 0 ? (
                      users.map((el) => (
                        <MenuItem
                          onClick={() => handleItemClick(el.id)}
                          key={el.id}
                        >
                          <Grid container alignItems="center">
                            <Avatar
                              className={classes.Avatar}
                              src={el.avatarImg || null}
                            />
                            <Typography>{el.username}</Typography>
                          </Grid>
                        </MenuItem>
                      ))
                    ) : (
                      <Typography>No new users</Typography>
                    )}
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
