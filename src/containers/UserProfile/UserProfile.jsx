import { Grid, Typography } from "@material-ui/core";
import React from "react";

const UserProfile = (props) => {
  const { id, name, birthDate, images } = { ...props };
  return (
    <Grid container direction="column" alignItems="center">
      <Typography>{id}</Typography>
      <Typography>{name}</Typography>
      <Typography>{birthDate}</Typography>
      <Typography>{images}</Typography>
    </Grid>
  );
};

export default UserProfile;
