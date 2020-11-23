import React from "react";
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Gallery from "../../components/Gallery/Gallery";
import Tags from "../../components/Tags/Tags";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Bio from "../../components/Bio/Bio";
import { useHistory } from "react-router-dom";
import { setCompanion } from "../../store/UISlice";
import { useChat } from "../../hooks/useChat.hook";
import defaultAvatar from "../../Images/default-avatar.png";
import { useWS } from "../../hooks/useWS.hook";

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
  const history = useHistory();
  const user = useSelector((state) => state.UI.companion);
  const { id, images, avatar, name, surname, country, city, age, bio, tags } = {
    ...user,
  };
  const defaultBio = "UFO flew here and dropped this message here";
  const { selectChat } = useChat();

  const handleChat = (e) => {
    selectChat(id);
    history.push(`/chat/${id}`);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.FullWidth}
    >
      <ProfileHeader img={avatar?.image || defaultAvatar} />

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
        <Tags tags={tags} />
        <Divider className={classes.FullWidth} />
        <Bio bio={bio || defaultBio} />
        <Gallery images={images} />
        <Button onClick={handleChat}>Message</Button>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
