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
import { useDispatch } from "react-redux";
import { sendVisit, sendLike, setCompanion } from "../../store/UISlice";
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
    position: "absolute",
    width: "100%",
  },
  StepperButton: {
    backgroundColor: "#ffffff00",
    textShadow: "0,0,10,#00000055",
  },
  CardMedia: {
    height: 0,
    paddingTop: "100%",
  },
  Like: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
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
    clearError,
  ] = useFetchedImages();
  const classes = useStyles();
  const { id, username, images, age } = { ...props.user };
  const [displayedImage, setDisplayedImage] = useState(0);
  const tags = props.tags || ["No tags"];
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    clearError();
    fetchImages(images);
    return () => {
      destroyImages();
    };
  }, [images]);

  useEffect(() => {
    if (error) {
      console.log(error);
      enqueueSnackbar("Failed to load images", { variant: "error" });
    }
  }, [error, enqueueSnackbar]);

  const showUserProfile = (e) => {
    dispatch(setCompanion({ companion: props.user }));
    dispatch(sendVisit(id));
    history.push("/strangers/" + id);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(sendLike(id));
  };

  const LeftButtonDisabled =
    fetchedImages.length === 0 || displayedImage === fetchedImages.length - 1;
  const RightButtonDisabled =
    displayedImage === 0 || fetchedImages.length === 0;

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card className={classes.UserCard} onClick={(e) => showUserProfile(e)}>
        <div>
          {fetchedImages.length > 1 && (
            <MobileStepper
              variant="dots"
              steps={0}
              position="static"
              activeStep={displayedImage}
              className={classes.Stepper}
              nextButton={
                LeftButtonDisabled ? null : (
                  <Button
                    className={classes.StepperButton}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDisplayedImage((prev) => prev + 1);
                    }}
                  >
                    <ChevronRightRoundedIcon />
                  </Button>
                )
              }
              backButton={
                RightButtonDisabled ? null : (
                  <Button
                    className={classes.StepperButton}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDisplayedImage((prev) => prev - 1);
                    }}
                  >
                    <ChevronLeftRoundedIcon />
                  </Button>
                )
              }
            />
          )}

          <Fab
            color="secondary"
            className={classes.Like}
            size="small"
            onClick={(e) => handleLike(e)}
          >
            <FavoriteOutlined />
          </Fab>

          <CardMedia
            className={classes.CardMedia}
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
