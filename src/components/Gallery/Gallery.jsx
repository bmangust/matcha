import {
  Card,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { media } from "../../axios";
import { saveNewState } from "../../store/generalSlice";
import defaultAvatar from "../../Images/default-avatar.png";

const useStyles = makeStyles({
  Card: {
    position: "relative",
    "&:hover": {
      "& $Media": {
        transform: "scale(1.2)",
      },
      "& $Info": {
        transform: "translateY(-1.5rem)",
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
    transform: "translateY(2rem)",
    width: "100%",
    textAlign: "center",
    color: "#fafafa",
    background: "linear-gradient(#00000000, #000000aa)",
  },
});

const Gallery = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let images = useSelector((state) => state.general.images);
  if (props.images) images = props.images;
  // console.log(images);

  const setAvatar = async (image) => {
    // let avatar changing only when Gallery is rendered with images from general redux slice
    if (props.images) return;
    // console.log(image);
    const res = await media.put("avatar", { imageId: image.id });
    dispatch(saveNewState({ avatar: image }));
    // console.log(res);
  };

  return (
    <Grid className={classes.Grid} container justify="center" spacing={1}>
      {images.length > 0 ? (
        images.map((el) => (
          <Grid item xs={8} sm={4} key={el.id || el}>
            <Card className={classes.Card}>
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
