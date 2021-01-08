import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  Button,
  Divider,
  Fab,
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
import { useChat } from "../../hooks/useChat.hook";
import defaultAvatar from "../../Images/default-avatar.png";
import {
  ChatRounded,
  Favorite,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import cn from "classnames";
import { sendLike, removeLike } from "../../store/UISlice";
import { FemaleColorIcon, MaleColorIcon } from "../../components/Icons/Icons";
import Report from "../../components/Report/Report";

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
    bottom: "8rem",
  },
  FabIcon: {
    marginRight: "10px",
  },
  Like: {
    position: "fixed",
    right: "1rem",
    bottom: "4rem",
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
  Report: {
    marginTop: 10,
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
    gender,
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
  const { likes, matches } = useSelector((state) => state.general);
  const [like, setLike] = useState(false);
  const status = isOnline
    ? "(online)"
    : `(last seen ${dayjs(lastOnline * 1000).fromNow()})`;
  const isMatched = matches.includes(id);
  const [openReport, setOpenReport] = useState(false);
  // console.log(matches, id, isMatched);

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

  const handleOpenReport = () => {
    setOpenReport((open) => !open);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    // if (like) {
    //   if (matches.includes(id)) {
    //     dispatch(addGeneralValues({ key: "likedBy", values: [id] }));
    //   }
    //   dispatch(removeLike(id));
    // } else {
    //   dispatch(sendLike(id));
    //   if (likedBy.includes(id)) {
    //     dispatch(addGeneralValues({ key: "matches", values: [id] }));
    //     dispatch(removeGeneralValues({ key: "likedBy", values: [id] }));
    //   }
    // }
    if (like) {
      dispatch(removeLike(id));
    } else {
      dispatch(sendLike(id));
    }
    // setLike((like) => !like);
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
          {gender === "male" ? <MaleColorIcon /> : <FemaleColorIcon />}
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
        <Button className={classes.Report} onClick={handleOpenReport}>
          Report user
        </Button>
        {isMatched && (
          <Fab
            variant="extended"
            color="primary"
            className={classes.Message}
            onClick={handleChat}
          >
            <ChatRounded className={classes.FabIcon} />
            Send message
          </Fab>
        )}
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
      <Report open={openReport} onClose={handleOpenReport} />
    </Grid>
  );
};

export default UserProfile;
