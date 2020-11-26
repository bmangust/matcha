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
  { users, autoFocusItem, defaultText, setOpen, action },
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

  const handleItemClick = (id) => {
    if (!users.length) return;
    const user = users.find((el) => el.id === id);
    const parent = location.pathname.split("/")[1];
    dispatch(setParent({ parent }));
    dispatch(setCompanion({ companion: user }));
    history.push(`/strangers/${id}`);
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
      {users.length > 0 ? (
        users.map((el) => (
          <MenuItem
            className={classes.ListItem}
            onClick={() => handleItemClick(el.id)}
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
        ))
      ) : (
        <Typography>{defaultText}</Typography>
      )}
    </MenuList>
  );
};

export default forwardRef(ClickableUsersList);
