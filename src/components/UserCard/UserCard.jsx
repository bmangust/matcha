import React, { useState, memo } from "react";
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
import {
  FavoriteOutlined,
  RemoveCircleOutlineRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@material-ui/icons";
import defaultImage from "../../Images/default-avatar.png";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  sendVisit,
  sendLike,
  setCompanion,
  setParent,
} from "../../store/UISlice";
import { banUser } from "../../hooks/useBan.hook";

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
      "& $Ban": {
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
  Tags: {
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
  Ban: {
    position: "absolute",
    bottom: "10px",
    right: "70px",
    transition: "0.3s",
    opacity: 0,
    zIndex: 4,
  },
});

const UserCard = (props) => {
  const classes = useStyles();
  const [displayedImage, setDisplayedImage] = useState(0);
  const { id, username, images, age } = { ...props.user };
  const tags = props.user.tags || ["No tags"];
  const history = useHistory();
  const dispatch = useDispatch();

  const showUserProfile = (e) => {
    const parent = "strangers";
    dispatch(setCompanion({ companion: props.user }));
    dispatch(sendVisit(id));
    dispatch(setParent({ parent }));
    history.push("/strangers/" + id);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch(sendLike(id));
  };

  const handleBan = (e) => {
    e.stopPropagation();
    banUser(id);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setDisplayedImage((prev) => prev + 1);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setDisplayedImage((prev) => prev - 1);
  };

  const LeftButtonDisabled =
    images?.length === 0 || displayedImage === images?.length - 1 || true;
  const RightButtonDisabled =
    displayedImage === 0 || images?.length === 0 || true;

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card className={classes.UserCard} onClick={showUserProfile}>
        <div>
          {images && images.length > 1 && (
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
                    onClick={handleNextImage}
                  >
                    <ChevronRightRounded />
                  </Button>
                )
              }
              backButton={
                RightButtonDisabled ? null : (
                  <Button
                    className={classes.StepperButton}
                    size="small"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeftRounded />
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

          <Fab
            color="secondary"
            className={classes.Ban}
            size="small"
            onClick={(e) => handleBan(e)}
          >
            <RemoveCircleOutlineRounded />
          </Fab>

          <CardMedia
            className={classes.CardMedia}
            image={
              (images && images.length && images[displayedImage].image) ||
              defaultImage
            }
          />

          <CardContent className={classes.Info}>
            <Container className={classes.InfoHeader}>
              <Typography>
                {username}, {age}
              </Typography>
            </Container>
            <div className={classes.Tags}>
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

export default memo(UserCard);
