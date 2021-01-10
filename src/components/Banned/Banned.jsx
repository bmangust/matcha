import React, { useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { ReplayRounded } from "@material-ui/icons";

import { useBan } from "../../hooks/useBan.hook";
import ClickableUsersList from "../ClickableUsersList/ClickableUsersList";
import { loadUsers } from "../../store/usersSlice";

const Banned = () => {
  const { banned, unbanAndUpdate } = useBan();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useLayoutEffect(() => {
    dispatch(loadUsers(banned));
  }, [dispatch, banned]);

  const bannedUsers = useMemo(
    () =>
      users && users.length
        ? banned.map((id) => users.find((user) => user.id === id))
        : [],
    [banned, users]
  );

  const unbanAction = useMemo(
    () => ({
      icon: <ReplayRounded />,
      color: "secondary",
      onClick: unbanAndUpdate,
      text: "unban",
    }),
    [unbanAndUpdate]
  );

  return (
    <Grid container item xs={12} sm={10} alignItems="center" justify="center">
      {banned ? (
        <ClickableUsersList
          items={bannedUsers}
          defaultText={"No users banned. Yet..."}
          action={unbanAction}
        />
      ) : (
        <Typography>No users banned. Yet...</Typography>
      )}
    </Grid>
  );
};

export default Banned;
