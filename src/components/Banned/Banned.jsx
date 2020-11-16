import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Grid } from "@material-ui/core";
import { ReplayRounded } from "@material-ui/icons";

import { useBan } from "../../hooks/useBan.hook";
import ClickableUsersList from "../ClickableUsersList/ClickableUsersList";

const Banned = () => {
  const { banned, unbanAndUpdate } = useBan();
  const users = useSelector((state) => state.users.users);
  const [bannedList, setBannedList] = useState(null);

  useEffect(() => {
    //   "fe4c83fea2e99350a7d6688de16b2ecdb0074dddea4f86f83ba6b24a1468981a",
    console.log(banned);
    console.log(users);
    if (!banned || !banned.length || !users.length) return;
    const bannedUsers = banned.map((id) =>
      users.find((user) => user.id === id)
    );
    console.log(bannedUsers);
    const unbanAction = {
      icon: <ReplayRounded />,
      color: "secondary",
      onClick: unbanAndUpdate,
    };
    const list = (
      <ClickableUsersList
        users={bannedUsers}
        defaultText={"No users to display"}
        action={unbanAction}
      />
    );
    setBannedList(list);
  }, [users, banned]);

  return <Grid container>{bannedList}</Grid>;
};

export default Banned;
