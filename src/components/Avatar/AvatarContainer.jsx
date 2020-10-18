import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import PublishIcon from "@material-ui/icons/Publish";
import { mediaUpload } from "../../axios";
import { Avatar, Badge, Fab, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  Avatar: {
    width: "300px",
    height: "300px",
  },
});

const AvatarContainer = () => {
  const classes = useStyles();
  const id = useSelector((state) => state.general.id);
  const initialAvatar = "https://avatarfiles.alphacoders.com/253/253160.jpg";
  const { enqueueSnackbar } = useSnackbar();
  const [avatar, setAvatar] = React.useState(initialAvatar);
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setAvatar(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setAvatar(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

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
      <Avatar className={classes.Avatar} src={avatar} />
    </Badge>
  );
};

export default AvatarContainer;
