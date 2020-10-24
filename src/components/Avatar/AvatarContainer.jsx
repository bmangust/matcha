import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import PublishIcon from "@material-ui/icons/Publish";
import { media, mediaUpload } from "../../axios";
import { Avatar, Badge, Fab, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import defaultAvatar from "../../Images/default-avatar.png";

const useStyles = makeStyles({
  Avatar: {
    width: "300px",
    height: "300px",
  },
});

const AvatarContainer = () => {
  const classes = useStyles();
  const { avatar, images, id } = { ...useSelector((state) => state.general) };
  const { enqueueSnackbar } = useSnackbar();
  const [displayedAvatar, setDisplayedAvatar] = useState(defaultAvatar);
  const [fetchedAvatar, setFetchedAvatar] = useState(null);
  const [selectedFile, setSelectedFile] = useState();

  // show selected file
  useEffect(() => {
    if (!selectedFile) {
      console.log(fetchedAvatar, defaultAvatar);
      const img = fetchedAvatar || defaultAvatar;
      setDisplayedAvatar(img);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setDisplayedAvatar(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, fetchedAvatar]);

  // show uploaded user avatar
  useEffect(() => {
    const userAvatar = avatar === "" ? images[0] : avatar;
    if (userAvatar) {
      if (displayedAvatar !== defaultAvatar) return;
      media(userAvatar).then((img) => {
        const file = URL.createObjectURL(img.data);
        setFetchedAvatar(file);
      });
    }
    return () => URL.revokeObjectURL(fetchedAvatar);
  }, [avatar, images]);

  const changeAvatarHandler = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      if (selectedFile) setSelectedFile(null);
      return;
    }
    const image = e.target.files[0];
    if (image.size > 1000000) {
      enqueueSnackbar("The file is larger than 1MB", { variant: "error" });
    }
    const res = await mediaUpload(id, image);
    setSelectedFile(image);

    if (res.data.status) {
      enqueueSnackbar("The file was uploaded", { variant: "success" });
    } else {
      console.error(res.data);
      enqueueSnackbar("Server error", { variant: "error" });
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
      <Avatar className={classes.Avatar} src={displayedAvatar} />
    </Badge>
  );
};

export default AvatarContainer;
