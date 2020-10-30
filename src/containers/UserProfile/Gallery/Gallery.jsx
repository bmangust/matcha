import { Card, CardMedia, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { media } from "../../../axios";
import { useFetchedImages } from "../../../hooks/loadImages.hook";
import { saveNewState } from "../../../store/generalSlice";

const useStyles = makeStyles({
  Media: {
    paddingTop: "100%",
  },
});

const Gallery = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let images = useSelector((state) => state.general.images);
  if (props.images) images = props.images;
  const [{ fetchedImages }, fetchImages, destroyImages] = useFetchedImages();

  console.log(props);
  console.log(images);

  useEffect(() => {
    fetchImages(images);
    return () => destroyImages();
  }, [images]);

  const setAvatar = async (imageId) => {
    console.log(imageId);
    const res = await media.put("avatar", { imageId });
    dispatch(saveNewState({ avatar: imageId }));
    console.log(res);
  };

  return (
    <Grid container justify="center" spacing={1}>
      {fetchedImages.length > 0 &&
        fetchedImages.map((el, index) => (
          <Grid item xs={8} sm={4} key={images[index]}>
            <Card>
              <CardMedia
                onClick={() => setAvatar(images[index])}
                className={classes.Media}
                image={el}
              />
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Gallery;
