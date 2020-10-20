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
import { media } from "../../axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendVisit, sendLike, setHeader } from "../../store/UISlice";

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
  const classes = useStyles();
  const userId = useSelector((state) => state.general.id);
  const { id, username, birth_date, images } = props;
  const [displayedImage, setDisplayedImage] = useState(0);
  const [imagesArray, setImagesArray] = useState([]);
  const tags = props.tags || ["No tags"];
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(images);
    if (images) {
      const promises = images.map((img) => media.get(img));
      const fetchedImages = [];
      Promise.all(promises)
        .then((imgs) => {
          imgs.forEach((img) => {
            console.log(img);
            const file = URL.createObjectURL(img.data);
            fetchedImages.push(file);
          });
          console.log(fetchedImages);
          setImagesArray(fetchedImages);
        })
        .catch((err) => console.log(err));
    }
  }, [images]);

  const showUserProfile = (e) => {
    e.stopPropagation();
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
            steps={imagesArray.length}
            position="static"
            activeStep={displayedImage}
            className={classes.Stepper}
            nextButton={
              <Button
                size="small"
                onClick={() => setDisplayedImage((prev) => prev + 1)}
                disabled={
                  imagesArray.length === 0 ||
                  displayedImage === imagesArray.length - 1
                }
              >
                <ChevronRightRoundedIcon />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={() => setDisplayedImage((prev) => prev - 1)}
                disabled={displayedImage === 0 || imagesArray.length === 0}
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
            image={imagesArray[displayedImage] || defaultImage}
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
