import {
  Button,
  makeStyles,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setCompanion, setParent } from "../../store/UISlice";
import { borderRadius } from "../../theme";
import NotificationListItem from "../NotificationListItem/NotificationListItem";
import ProfileListItem from "../ProfileListItem/ProfileListItem";

const useStyles = makeStyles({
  Button: {
    padding: "7px 30px",
  },
  Menu: {
    width: "100%",
  },
  ListItem: {
    borderRadius: borderRadius,
  },
});

const ClickableUsersList = (
  { items, autoFocusItem, defaultText, setOpen, action },
  ref
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      if (setOpen) setOpen(false);
    }
  }

  const handleItemClick = (user) => {
    if (!items.length) return;
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
        items.map((el) =>
          el.user ? (
            <MenuItem
              className={classes.ListItem}
              onClick={() => handleItemClick(el.user)}
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
          )
        )
      ) : (
        <Typography>{defaultText}</Typography>
      )}
    </MenuList>
  );
};

export default forwardRef(ClickableUsersList);
