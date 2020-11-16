import {
  Button,
  Fab,
  makeStyles,
  MenuItem,
  MenuList,
  Typography,
} from "@material-ui/core";
import React, { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCompanion } from "../../store/UISlice";
import ProfileListItem from "../ProfileListItem/ProfileListItem";

const useStyles = makeStyles({
  Button: {
    padding: "7px 30px",
  },
  Menu: {
    width: "100%",
  },
  ListItem: {
    borderRadius: "30px",
  },
});

const ClickableUsersList = (
  { users, autoFocusItem, defaultText, setOpen, action },
  ref
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      if (setOpen) setOpen(false);
    }
  }

  const handleItemClick = (id) => {
    if (!users.length) return;
    const user = users.find((el) => el.id === id);
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
