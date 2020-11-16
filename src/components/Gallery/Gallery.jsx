import { Card, CardMedia, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { media } from "../../axios";
import { saveNewState } from "../../store/generalSlice";

const useStyles = makeStyles({
  Media: {
    paddingTop: "100%",
  },
  Grid: {
    marginTop: "10px",
  },
});

const Gallery = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let images = useSelector((state) => state.general.images);
  if (props.images) images = props.images;
  console.log(images);

  const setAvatar = async (image) => {
    // let avatar changing only when Gallery is rendered with images from general redux slice
    if (props.images) return;
    console.log(image);
    const res = await media.put("avatar", { imageId: image.id });
    dispatch(saveNewState({ avatar: image }));
    console.log(res);
  };

  return (
    <Grid className={classes.Grid} container justify="center" spacing={1}>
      {images.length > 0 &&
        images.map((el) => (
          <Grid item xs={8} sm={4} key={el.id}>
            <Card>
              <CardMedia
                onClick={() => setAvatar(el)}
                className={classes.Media}
                image={el.image}
              />
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Gallery;
