import {
  Button,
  makeStyles,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { CONSTANTS } from "../../models/ws";
import { setCompanion, setParent } from "../../store/UISlice";
import { readNotification } from "../../store/WSSlice";
import { borderRadius } from "../../theme";
import NotificationListItem from "../NotificationListItem/NotificationListItem";
import ProfileListItem from "../ProfileListItem/ProfileListItem";

const useStyles = makeStyles((theme) => ({
  Button: {
    padding: "7px 30px",
  },
  Menu: {
    width: "100%",
  },
  ListItem: {
    borderRadius: borderRadius,
  },
  Unread: {
    backgroundColor: theme.palette.grey[200],
  },
  Center: {
    textAlign: "center",
  },
}));

const ClickableUsersList = (
  { items, autoFocusItem, defaultText, setOpen, action },
  ref
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  function handleListKeyDown(event) {
    if (!setOpen) return;
    if (event.key === "Tab") {
      event.preventDefault();
      if (setOpen) setOpen(false);
    }
  }

  const handleItemClick = (user, id = null) => {
    if (!items.length) return;
    if (id) dispatch(readNotification({ id }));
    const parent = location.pathname.split("/")[1];
    dispatch(setParent({ parent }));
    dispatch(setCompanion({ companion: user }));
    history.push(`/strangers/${user.id}`);
    if (setOpen) setOpen(false);
  };

  const handleActionClick = (e, id) => {
    e.stopPropagation();
    action.onClick(id);
  };

  return (
    <MenuList
      className={classes.Menu}
      ref={ref}
      autoFocusItem={autoFocusItem}
      id="users-list"
      onKeyDown={handleListKeyDown}
    >
      {items && items.length > 0 ? (
        items.map((el) => {
          if (!el) return null;
          return el.user ? (
            <MenuItem
              className={
                el.status === CONSTANTS.UPDATE_STATUS.READ
                  ? classes.ListItem
                  : cn(classes.ListItem, classes.Unread)
              }
              onClick={() => handleItemClick(el.user, el.id)}
              key={el.id}
            >
              <NotificationListItem notification={el} />
            </MenuItem>
          ) : (
            <MenuItem
              className={classes.ListItem}
              onClick={() => handleItemClick(el)}
              key={el.id}
            >
              <ProfileListItem user={el} />
              {action && (
                <Button
                  className={classes.Button}
                  color={action.color}
                  endIcon={action.icon}
                  onClick={(e) => handleActionClick(e, el.id)}
                >
                  unban user
                </Button>
              )}
            </MenuItem>
          );
        })
      ) : (
        <Typography className={classes.Center}>{defaultText}</Typography>
      )}
    </MenuList>
  );
};

export default forwardRef(ClickableUsersList);
