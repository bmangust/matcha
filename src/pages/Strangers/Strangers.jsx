import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  Strangers: {
    fontSize: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "60px",
  },
});

const strangers = [
  {
    id: 253160,
    username: "Spidey",
    age: 25,
    images: ["https://avatarfiles.alphacoders.com/253/253160.jpg"],
    tags: ["sport"],
    liked: false,
  },
  {
    id: 253809,
    username: "Mary",
    age: 21,
    images: [
      "https://avatarfiles.alphacoders.com/253/253809.png",
      "https://avatarfiles.alphacoders.com/252/252602.jpg",
      "https://avatarfiles.alphacoders.com/251/251867.png",
    ],
    tags: ["dolls", "beauty", "relax"],
    liked: true,
  },
  {
    id: 251890,
    username: "Fallen",
    age: 31,
    images: [
      "https://avatarfiles.alphacoders.com/251/251890.jpg",
      "https://avatarfiles.alphacoders.com/254/254919.png",
    ],
    tags: ["weapons", "anime"],
    liked: false,
  },
  {
    id: 251973,
    username: "Sweetie",
    age: 42,
    images: [
      "https://avatarfiles.alphacoders.com/251/251973.jpg",
      "https://avatarfiles.alphacoders.com/252/252670.png",
    ],
    tags: ["beach", "bike"],
    liked: false,
  },
];

const Strangers = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.Strangers}>
      <h2>Strangers</h2>
      <Grid container item xs={10} spacing={3}>
        {strangers.map((el) => (
          <UserCard {...el} key={el.id} />
        ))}
      </Grid>
    </div>
  );
};

export default Strangers;
