import React, { useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Divider, Fab, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Gallery from "../../components/Gallery/Gallery";
import Tags from "../../components/Tags/Tags";
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader";
import Bio from "../../components/Bio/Bio";
import { useHistory } from "react-router-dom";
import { useChat } from "../../hooks/useChat.hook";
import defaultAvatar from "../../Images/default-avatar.png";
import {
  ChatRounded,
  Favorite,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import cn from "classnames";
import { sendLike, removeLike } from "../../store/UISlice";
import {
  addGeneralValues,
  removeGeneralValues,
} from "../../store/generalSlice";

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  Typography: {
    fontSize: "1.5rem",
  },
  Name: {
    fontSize: "2rem",
    marginRight: 10,
  },
  Location: {
    fontSize: "1rem",
  },
  FullWidth: {
    width: "100%",
  },
  Message: {
    position: "fixed",
    right: "1rem",
    bottom: "4rem",
  },
  FabIcon: {
    marginRight: "10px",
  },
  Like: {
    position: "fixed",
    right: "1rem",
    bottom: "8rem",
  },
  Status: {
    position: "absolute",
    left: "50%",
    width: "50%",
    marginLeft: "-25%",
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.palette.grey[500],
  },
  Online: {
    backgroundColor: theme.palette.success.main,
  },
}));

const UserProfile = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector((state) => state.UI.companion);
  const {
    id,
    images,
    avatar,
    name,
    surname,
    country,
    city,
    age,
    bio,
    tags,
    isOnline,
    lastOnline,
  } = {
    ...user,
  };
  const defaultBio = "UFO flew around and dropped this message here";
  const { selectChat, createChat } = useChat();
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat.chat);
  const { likes } = useSelector((state) => state.general);
  const [like, setLike] = React.useState(false);
  const status = isOnline
    ? "(online)"
    : `(last seen ${dayjs(lastOnline).fromNow()})`;

  useEffect(() => {
    const isLiked = () => likes.includes(id);
    setLike(isLiked);
  }, [likes, id]);

  useEffect(() => {
    if (!chat) return;
    history.push(`/chat/${chat}`);
  }, [chat, history]);

  const handleChat = async (e) => {
    if (!selectChat(id)) {
      if (await createChat(id)) selectChat(id);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (like) {
      dispatch(removeLike(id));
      dispatch(removeGeneralValues({ key: "likes", values: [id] }));
    } else {
      dispatch(sendLike(id));
      dispatch(addGeneralValues({ key: "likes", values: [id] }));
    }
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.FullWidth}
    >
      <ProfileHeader img={avatar?.image || images[0]?.image || defaultAvatar} />
      <div>
        <div
          className={
            isOnline ? cn(classes.Status, classes.Online) : classes.Status
          }
        />
      </div>

      <Grid
        container
        direction="column"
        alignItems="center"
        item
        xs={12}
        sm={8}
        md={6}
      >
        <Grid container justify="center" alignItems="baseline">
          <Typography
            className={classes.Name}
          >{`${name} ${surname}`}</Typography>
          <Typography className={classes.Typography}>{status}</Typography>
        </Grid>
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
        <Fab
          variant="extended"
          color="primary"
          className={classes.Message}
          onClick={handleChat}
        >
          <ChatRounded className={classes.FabIcon} />
          Send message
        </Fab>
        <Fab
          variant="extended"
          color="secondary"
          className={classes.Like}
          onClick={handleLike}
        >
          {like ? (
            <>
              <FavoriteBorderOutlined className={classes.FabIcon} />
              Unlike user
            </>
          ) : (
            <>
              <Favorite className={classes.FabIcon} />
              Like user
            </>
          )}
        </Fab>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
