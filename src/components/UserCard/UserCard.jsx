import React, { useState, useEffect } from "react";
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
  Tooltip,
} from "@material-ui/core";
import {
  FavoriteOutlined,
  RemoveCircleOutlineRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import defaultImage from "../../Images/default-avatar.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendVisit,
  sendLike,
  setCompanion,
  setParent,
  removeLike,
} from "../../store/UISlice";
import cn from "classnames";
import { useBan } from "../../hooks/useBan.hook";
import { theme } from "../../theme";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles({
  UserCard: {
    maxWidth: 350,
    minWidth: 220,
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
      "& $Info": {
        transform: "translateY(-80px)",
      },
      "& $Fab": {
        opacity: 1,
      },
      "& $Stepper": {
        opacity: 1,
      },
    },
  },
  Info: {
    width: "105%",
    padding: "10px 30px 20px",
    position: "absolute",
    color: "white",
    left: -10,
    background: "linear-gradient(#00000000, #000000aa)",
    transition: "0.3s",
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
    transition: "0.3s",
    opacity: 0,
  },
  StepperButton: {
    backgroundColor: "#ffffff00",
    textShadow: "0,0,10,#00000055",
  },
  CardMedia: {
    height: 0,
    paddingTop: "100%",
  },
  Fab: {
    position: "absolute",
    bottom: 10,
    right: 10,
    transition: "0.3s",
    opacity: 0,
    zIndex: 3,
  },
  Like: {
    right: 70,
  },
  Ban: {
    right: 10,
  },
  Status: {
    position: "absolute",
    bottom: 5,
    left: "50%",
    marginLeft: -20,
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: theme.palette.grey[500],
  },
  Online: {
    backgroundColor: theme.palette.success.main,
  },
  Tooltip: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.grey[700],
    padding: 20,
  },
});

const defaultUser = {
  username: "",
  images: null,
  age: 0,
  isOnline: false,
};

const UserCard = (props) => {
  const classes = useStyles();
  const [displayedImage, setDisplayedImage] = useState(0);
  const { id } = { ...props.user };
  const user = useSelector((state) => state.users.users).find(
    (user) => user.id === id
  );
  const { username, images, age, isOnline } = user ? user : defaultUser;
  const tags = props.user.tags;
  const history = useHistory();
  const dispatch = useDispatch();
  const { banAndUpdate } = useBan();
  const { likes } = useSelector((state) => state.general);
  const [like, setLike] = useState(false);

  useEffect(() => {
    const isLiked = () => likes.includes(id);
    setLike(isLiked);
  }, [likes, id]);

  const showUserProfile = (e) => {
    const parent = "strangers";
    dispatch(setCompanion({ companion: props.user }));
    dispatch(sendVisit(id));
    dispatch(setParent({ parent }));
    history.push("/strangers/" + id);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (like) {
      dispatch(removeLike(id));
    } else {
      dispatch(sendLike(id));
    }
  };

  const handleBan = (e) => {
    e.stopPropagation();
    banAndUpdate(id);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setDisplayedImage((prev) => prev + 1);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setDisplayedImage((prev) => prev - 1);
  };

  const currentImage = () => {
    let img = defaultImage;
    if (images && images.length) {
      if (images[displayedImage].image) img = images[displayedImage].image;
      else return <Skeleton variant="rect" className={classes.CardMedia} />;
    }
    return <CardMedia className={classes.CardMedia} image={img} />;
  };

  const LeftButtonDisabled =
    images?.length === 0 || displayedImage === images?.length - 1;
  const RightButtonDisabled = displayedImage === 0 || images?.length === 0;

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
                    color="secondary"
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
                    color="secondary"
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

          {images && images.length > 0 && (
            <Tooltip
              style={{ tooltip: classes.Tooltip }}
              title={like ? "Unlike user" : "Like user"}
              aria-label={like ? "Unlike user" : "Like user"}
            >
              <Fab
                color={"secondary"}
                className={cn(classes.Fab, classes.Like)}
                size="small"
                onClick={(e) => handleLike(e)}
              >
                {like ? <FavoriteBorderOutlined /> : <FavoriteOutlined />}
              </Fab>
            </Tooltip>
          )}

          <Tooltip
            style={{ tooltip: classes.Tooltip }}
            title={"Ban user"}
            aria-label={"Ban user"}
          >
            <Fab
              color="secondary"
              className={cn(classes.Fab, classes.Ban)}
              size="small"
              onClick={(e) => handleBan(e)}
            >
              <RemoveCircleOutlineRounded />
            </Fab>
          </Tooltip>

          {/* cardMedia */}
          {currentImage()}

          <div
            className={
              isOnline ? cn(classes.Status, classes.Online) : classes.Status
            }
          />

          <CardContent className={classes.Info}>
            <Container className={classes.InfoHeader}>
              <Typography>
                {username}, {age}
              </Typography>
            </Container>
            <div className={classes.Tags}>
              {tags ? (
                tags.map((el) => <span key={el}>#{el}</span>)
              ) : (
                <span>No tags</span>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
};

export default UserCard;
