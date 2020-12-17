import {
  Card,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { media } from "../../axios";
import { saveNewState } from "../../store/generalSlice";
import defaultAvatar from "../../Images/default-avatar.png";
import { DeleteOutlineRounded } from "@material-ui/icons";
import { useNotifications } from "../../hooks/useNotifications";

const useStyles = makeStyles({
  Card: {
    position: "relative",
    "&:hover": {
      "& $Media": {
        transform: "scale(1.2)",
      },
      "& $Info": {
        transform: "translateY(0rem)",
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
  Info: {
    position: "absolute",
    transform: "translateY(-10rem)",
    width: "100%",
    textAlign: "center",
    color: "#fafafa",
    background: "linear-gradient(#000000aa, #00000000)",
    zIndex: 2,
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
  let images = useSelector((state) => state.general.images);
  // props are set when Gallery is rendered in user profile
  if (props.images) images = props.images;
  const notif = useNotifications();
  console.log(images);
  console.log(props);

  const setAvatar = async (image) => {
    // let avatar changing only when Gallery is rendered with images from general redux slice
    console.log("setAvatar");
    if (props.images) return;
    try {
      const res = await media.put("avatar", { imageId: image.id });
      if (res.data.status) {
        dispatch(saveNewState({ avatar: image }));
      }
    } catch (e) {}
  };

  const handleRemove = async (e, imageId) => {
    if (props.images) return;
    e.stopPropagation();
    try {
      const res = await media.delete(`img/${imageId}`);
      if (res.data.status) {
        const newImages = images.filter((img) => img.id !== imageId);
        dispatch(saveNewState({ images: newImages }));
      }
    } catch (e) {
      notif("Server error, try again later", "error");
    }
  };

  return (
    <Grid className={classes.Grid} container justify="center" spacing={1}>
      {images.length > 0 ? (
        images.map((el) => (
          <Grid item xs={10} sm={4} key={el.id || el}>
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
                  <CardContent className={classes.Info}>
                    <Typography>Click to set avatar</Typography>
                  </CardContent>
                </>
              )}

              <CardMedia
                onClick={() => setAvatar(el)}
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
