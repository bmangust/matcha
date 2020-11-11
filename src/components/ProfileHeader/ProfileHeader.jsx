import { Card, CardMedia, makeStyles } from "@material-ui/core";
import React from "react";
import defaultImage from "../../Images/default-avatar.png";

const useStyles = makeStyles({
  Card: {
    width: "90%",
  },
  Media: {
    paddingTop: "30%",
  },
});

const ProfileHeader = ({ img }) => {
  const classes = useStyles();

  return (
    <Card className={classes.Card}>
      <CardMedia className={classes.Media} image={img || defaultImage} />
    </Card>
  );
};

export default ProfileHeader;
