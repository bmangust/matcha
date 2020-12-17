import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { ReplayRounded } from "@material-ui/icons";

import { useBan } from "../../hooks/useBan.hook";
import ClickableUsersList from "../ClickableUsersList/ClickableUsersList";

const Banned = () => {
  const { banned, unbanAndUpdate } = useBan();
  const users = useSelector((state) => state.users.users);
  const bannedUsers = useMemo(
    () => banned.map((id) => users.find((user) => user.id === id)),
    [banned, users]
  );

  const unbanAction = useMemo(
    () => ({
      icon: <ReplayRounded />,
      color: "secondary",
      onClick: unbanAndUpdate,
    }),
    [unbanAndUpdate]
  );

  return (
    <Grid container justify="center">
      {banned ? (
        <ClickableUsersList
          users={bannedUsers}
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
