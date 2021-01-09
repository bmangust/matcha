import React, { useState } from "react";
import PublishIcon from "@material-ui/icons/Publish";
import { mediaUpload } from "../../axios";
import { Avatar, Badge, Fab, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../Images/default-avatar.png";
import { setNewState } from "../../store/generalSlice";
import { useNotifications } from "../../hooks/useNotifications";

const useStyles = makeStyles({
  Avatar: {
    width: "300px",
    height: "300px",
  },
});

const AvatarContainer = ({ loadingDisabled }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, images, avatar } = useSelector((state) => state.general);
  const { notif } = useNotifications();
  const [displayedAvatar, setDisplayedAvatar] = useState(null);

  const changeAvatarHandler = async (e) => {
    if (loadingDisabled) {
      notif("Cannot upload more than 5 images", "error");
      return;
    }
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const image = e.target.files[0];
    console.log(image);
    if (image.size > 1000000) {
      notif("The file is larger than 1MB", "error");
      return;
    }
    if (image.type.search(/image\/(png|jpeg)/i) < 0) {
      notif("Only png anf jpeg files allowed", "error");
      return;
    }
    try {
      const res = await mediaUpload(id, image);
      const objectUrl = URL.createObjectURL(image);
      const avatar = { id: res.data.data.id, image: objectUrl };

      if (res.data.status && res.data.data) {
        setDisplayedAvatar(avatar);
        dispatch(setNewState({ images: [...images, avatar] }));
        notif("The file was uploaded", "success");
      } else {
        URL.revokeObjectURL(objectUrl);
        throw new Error("Unable to upload a photo");
      }
    } catch (e) {
      notif(e, "error");
    }
  };

  return (
    <Badge
      overlap="circle"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      badgeContent={
        <Fab
          color="primary"
          aria-label="upload image"
          component="label"
          onChange={(e) => changeAvatarHandler(e)}
        >
          <PublishIcon />
          <input type="file" style={{ display: "none" }} />
        </Fab>
      }
    >
      <Avatar
        className={classes.Avatar}
        src={displayedAvatar?.image || avatar?.image || defaultAvatar}
      />
    </Badge>
  );
};

export default AvatarContainer;
