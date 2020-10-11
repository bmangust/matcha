import React from "react";
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
import { secondaryColor } from "../../theme";

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
  const { username, age, images, tags } = props;
  const [displayedImage, setDisplayedImage] = React.useState(0);

  return (
    <Grid item xs={12} sm={6}>
      <Card className={classes.UserCard}>
        <div>
          <MobileStepper
            variant="dots"
            steps={images.length}
            position="static"
            activeStep={displayedImage}
            className={classes.Stepper}
            nextButton={
              <Button
                size="small"
                onClick={() => setDisplayedImage((prev) => prev + 1)}
                disabled={displayedImage === images.length - 1}
              >
                <ChevronRightRoundedIcon />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={() => setDisplayedImage((prev) => prev - 1)}
                disabled={displayedImage === 0}
              >
                <ChevronLeftRoundedIcon />
              </Button>
            }
          />

          <Fab color="secondary" className={classes.Like} size="small">
            <FavoriteOutlined />
          </Fab>

          <CardMedia className={classes.media} image={images[displayedImage]} />

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
