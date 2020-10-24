import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Gallery from "./Gallery/Gallery";

const UserProfile = (props) => {
  const { id, username, birthDate, images, avatar } = {
    ...useSelector((state) => state.UI.companion),
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Typography>{id}</Typography>
      <Typography>{username}</Typography>
      <Typography>{birthDate}</Typography>
      {/* <Gallery images={[avatar, ...images]} /> */}
    </Grid>
  );
};

export default UserProfile;
