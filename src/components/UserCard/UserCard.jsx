import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  Grid,
  makeStyles,
  MobileStepper,
  Button,
  Container,
  CardContent,
  Typography,
  Fab,
} from "@material-ui/core";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRight";
import { FavoriteOutlined } from "@material-ui/icons";
import defaultImage from "../../Images/default-avatar.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendVisit, sendLike, setHeader } from "../../store/UISlice";
import { useFetchedImages } from "../../hooks/loadImages.hook";
import { useSnackbar } from "notistack";

const useStyles = makeStyles({
  UserCard: {
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
      "& $Info": {
        transform: "translateY(-80px)",
      },
      "& $Like": {
        opacity: 1,
      },
    },
  },
  UserCardContent: {
    height: 0,
    paddingTop: "100%",
  },
  Info: {
    width: "105%",
    padding: "10px 30px 20px",
    position: "absolute",
    color: "white",
    left: "-10px",
    background: "linear-gradient(#00000000, #000000aa)",
  },
  InfoHeader: {
    justifyContent: "space-between",
    padding: 0,
    "& p": {
      fontSize: "1.5rem",
    },
  },
  Interests: {
    lineHeight: "0.5rem",
    "& span": {
      fontSize: "1rem",
    },
    "& span:nth-child(n+2)::before": {
      content: '"|"',
      margin: "0 10px",
    },
  },
  Stepper: {
    backgroundColor: "#ffffff00",
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  Like: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    transition: "0.3s",
    opacity: 0,
    zIndex: 3,
  },
});

const UserCard = (props) => {
  const [
    { fetchedImages, error },
    fetchImages,
    destroyImages,
  ] = useFetchedImages();
  const classes = useStyles();
  const userId = useSelector((state) => state.general.id);
  const { id, username, birth_date, images, avatar } = props;
  const [displayedImage, setDisplayedImage] = useState(0);
  const tags = props.tags || ["No tags"];
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const imgs = avatar ? [avatar, ...images] : images;
    fetchImages(imgs);
    return () => destroyImages();
  }, [images, avatar]);

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: "error" });
  }, [error]);

  const showUserProfile = (e) => {
    dispatch(setHeader({ header: `${username}'s profile` }));
    dispatch(sendVisit(userId, id));
    history.push("/strangers/" + id);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(sendLike(userId, id));
  };

  const age = new Date().getFullYear() - new Date(birth_date).getFullYear();

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card className={classes.UserCard} onClick={(e) => showUserProfile(e)}>
        <div>
          <MobileStepper
            variant="dots"
            steps={fetchedImages.length}
            position="static"
            activeStep={displayedImage}
            className={classes.Stepper}
            nextButton={
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setDisplayedImage((prev) => prev + 1);
                }}
                disabled={
                  fetchedImages.length === 0 ||
                  displayedImage === fetchedImages.length - 1
                }
              >
                <ChevronRightRoundedIcon />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setDisplayedImage((prev) => prev - 1);
                }}
                disabled={displayedImage === 0 || fetchedImages.length === 0}
              >
                <ChevronLeftRoundedIcon />
              </Button>
            }
          />

          <Fab
            color="secondary"
            className={classes.Like}
            size="small"
            onClick={(e) => handleLike(e)}
          >
            <FavoriteOutlined />
          </Fab>

          <CardMedia
            className={classes.media}
            image={fetchedImages[displayedImage] || defaultImage}
          />

          <CardContent className={classes.Info}>
            <Container className={classes.InfoHeader}>
              <Typography>
                {username}, {age}
              </Typography>
            </Container>
            <div className={classes.Interests}>
              {tags.map((el) => (
                <span key={el}>{el}</span>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
};

export default UserCard;
