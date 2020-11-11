import React from "react";
import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Gallery from "../../components/Gallery/Gallery";
import Tags from "../../components/Tags/Tags";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Bio from "../../components/Bio/Bio";

const useStyles = makeStyles({
  Typography: {
    fontSize: "1.5rem",
  },
  Name: {
    fontSize: "2rem",
  },
  Location: {
    fontSize: "1rem",
  },
  FullWidth: {
    width: "100%",
  },
});

const UserProfile = (props) => {
  const classes = useStyles();
  const user = useSelector((state) => state.UI.companion);
  const { images, avatar, name, surname, country, city, age, bio } = {
    ...user,
  };
  const defaultBio = "UFO flew here and dropped this message here";

  const tags = ["horses", "sweets", "sea"];
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.FullWidth}
    >
      <ProfileHeader img={avatar.image} />

      <Grid
        container
        direction="column"
        alignItems="center"
        item
        xs={12}
        sm={8}
        md={6}
      >
        <Typography className={classes.Name}>{`${name} ${surname}`}</Typography>
        <Typography color="secondary" className={classes.Location}>
          {`${country}, ${city}`}
        </Typography>
        <Typography
          className={classes.Typography}
        >{`${age} years old`}</Typography>
        <Divider className={classes.FullWidth} />
        {tags && <Tags tags={tags} />}
        <Divider className={classes.FullWidth} />
        <Bio bio={bio || defaultBio} />
        <Gallery images={images} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
