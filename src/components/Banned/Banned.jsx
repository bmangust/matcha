import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Grid, Typography } from "@material-ui/core";
import { ReplayRounded } from "@material-ui/icons";

import { useBan } from "../../hooks/useBan.hook";
import ClickableUsersList from "../ClickableUsersList/ClickableUsersList";

const Banned = () => {
  const { banned, unbanAndUpdate } = useBan();
  const users = useSelector((state) => state.users.users);
  const [bannedList, setBannedList] = useState(null);
  const bannedUsers = useMemo(
    () => banned.map((id) => users.find((user) => user.id === id)),
    [banned, users]
  );

  useEffect(() => {
    // console.log(banned);
    // console.log(users);
    if (!banned || !users.length) return;

    // console.log(bannedUsers);
    const unbanAction = {
      icon: <ReplayRounded />,
      color: "secondary",
      onClick: unbanAndUpdate,
    };
    const list = (
      <ClickableUsersList
        users={bannedUsers}
        defaultText={"No users banned. Yet..."}
        action={unbanAction}
      />
    );
    setBannedList(list);
  }, [users, banned, bannedUsers, unbanAndUpdate]);

  return (
    <Grid container justify="center">
      {bannedList || <Typography>No users banned. Yet...</Typography>}
    </Grid>
  );
};

export default Banned;
