import { Card, CardMedia, Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useFetchedImages } from "../../../hooks/loadImages.hook";

const useStyles = makeStyles({
  Media: {
    paddingTop: "100%",
  },
});

const Gallery = (props) => {
  const classes = useStyles();
  const { images } = props;
  const [{ fetchedImages }, fetchImages, destroyImages] = useFetchedImages();

  useEffect(() => {
    fetchImages(images);
    return () => destroyImages();
  }, [images]);

  return (
    <Grid container justify="center" spacing={1}>
      {fetchedImages.length > 0 &&
        fetchedImages.map((el, index) => (
          <Grid item xs={8} sm={4} key={images[index]}>
            <Card>
              <CardMedia className={classes.Media} image={el} />
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default Gallery;
