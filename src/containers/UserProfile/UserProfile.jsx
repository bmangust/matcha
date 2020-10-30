import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Gallery from "./Gallery/Gallery";

const UserProfile = () => {
  const user = useSelector((state) => state.UI.companion);
  const { images, age } = { ...user };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ width: "100%" }}
    >
      <Typography variant="h5">{`Age: ${age}`}</Typography>
      <Gallery images={images} />
    </Grid>
  );
};

export default UserProfile;
