import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Gallery from "./Gallery/Gallery";

const UserProfile = () => {
  const user = useSelector((state) => state.UI.companion);
  const { birthDate, images, avatar, age } = { ...user };
  const imgs = avatar ? [avatar, ...images] : images;

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ width: "100%" }}
    >
      <Typography variant="h5">{`Age: ${age}`}</Typography>
      <Gallery images={imgs} />
    </Grid>
  );
};

export default UserProfile;
