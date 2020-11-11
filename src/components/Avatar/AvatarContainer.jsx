import React, { useState } from "react";
import PublishIcon from "@material-ui/icons/Publish";
import { mediaUpload } from "../../axios";
import { Avatar, Badge, Fab, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import defaultAvatar from "../../Images/default-avatar.png";
import { saveNewState } from "../../store/generalSlice";
import { useNotifications } from "../../hooks/useNotifications";

const useStyles = makeStyles({
  Avatar: {
    width: "300px",
    height: "300px",
  },
});

const AvatarContainer = () => {
  const classes = useStyles();
  const { id, images, avatar } = useSelector((state) => state.general);
  const showNotif = useNotifications();
  const [displayedAvatar, setDisplayedAvatar] = useState(null);

  const changeAvatarHandler = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const image = e.target.files[0];
    if (image.size > 1000000) {
      showNotif("The file is larger than 1MB", "error");
    }
    const res = await mediaUpload(id, image);
    const objectUrl = URL.createObjectURL(image);
    const avatar = { id: res.data.data.id, image: objectUrl };
    setDisplayedAvatar(avatar);

    if (res.data.status && res.data.data) {
      saveNewState({ images: [...images, avatar] });
      showNotif("The file was uploaded");
    } else {
      console.error(res.data);
      showNotif("Server error", "error");
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
        src={displayedAvatar?.image || avatar.image || defaultAvatar}
      />
    </Badge>
  );
};

export default AvatarContainer;
