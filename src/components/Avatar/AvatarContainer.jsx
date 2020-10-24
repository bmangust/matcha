import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import PublishIcon from "@material-ui/icons/Publish";
import { mediaUpload } from "../../axios";
import { Avatar, Badge, Fab, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import defaultAvatar from "../../Images/default-avatar.png";
import { fetchAvatar } from "../../hooks/loadUsers.hook";

const useStyles = makeStyles({
  Avatar: {
    width: "300px",
    height: "300px",
  },
});

const AvatarContainer = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.general);
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
    if (fetchedAvatar) return;
    const getAvatar = async () => {
      const ava = await fetchAvatar(user);
      setFetchedAvatar(ava);
    };
    getAvatar();
    return () => URL.revokeObjectURL(fetchedAvatar);
  }, [user, fetchedAvatar]);

  const changeAvatarHandler = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      if (selectedFile) setSelectedFile(null);
      return;
    }
    const image = e.target.files[0];
    if (image.size > 1000000) {
      enqueueSnackbar("The file is larger than 1MB", { variant: "error" });
    }
    const res = await mediaUpload(user.id, image);
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
