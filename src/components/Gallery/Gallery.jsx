import {
  Card,
  CardMedia,
  Fab,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { media } from "../../axios";
import { setNewState } from "../../store/generalSlice";
import defaultAvatar from "../../Images/default-avatar.png";
import { DeleteOutlineRounded } from "@material-ui/icons";
import { useNotifications } from "../../hooks/useNotifications";

const useStyles = makeStyles({
  Card: {
    position: "relative",
    maxWidth: 350,
    margin: "0 auto",
    "&:hover": {
      "& $Media": {
        transform: "scale(1.2)",
      },
      "& $Fab": {
        opacity: 1,
      },
    },
  },
  Media: {
    paddingTop: "100%",
  },
  Grid: {
    marginTop: "10px",
  },
  Fab: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    transition: "0.3s",
    opacity: 0,
    zIndex: 4,
  },
});

const Gallery = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let { images, avatar } = useSelector((state) => state.general);
  // props are set when Gallery is rendered in user profile
  if (props.images) images = props.images;
  const { notif } = useNotifications();
  console.log(images);
  console.log(props);

  const handleRemove = async (e, imageId) => {
    e.stopPropagation();
    if (props.images) return;
    try {
      const res = await media.delete(`img/${imageId}`, {
        responseType: "json",
      });
      console.log(res);
      if (res.data.status) {
        const newImages = images.filter((img) => img.id !== imageId);
        const newAvatar = imageId === avatar.id ? newImages[0] : avatar;
        console.log(newImages, newAvatar);
        dispatch(setNewState({ images: newImages, avatar: newAvatar }));
      }
    } catch (e) {
      console.log(e);
      notif("Server error, try again later", "error");
    }
  };

  return (
    <Grid className={classes.Grid} container justify="center" spacing={1}>
      {images.length > 0 ? (
        images.map((el) => (
          <Grid item xs={10} sm={6} md={4} key={el.id || el}>
            <Card className={classes.Card}>
              {!props.images && (
                <>
                  <Fab
                    color="secondary"
                    className={classes.Fab}
                    size="small"
                    onClick={(e) => handleRemove(e, el.id)}
                  >
                    <DeleteOutlineRounded />
                  </Fab>
                </>
              )}

              <CardMedia
                className={classes.Media}
                image={el.image || defaultAvatar}
              />
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>No images</Typography>
      )}
    </Grid>
  );
};

export default Gallery;
