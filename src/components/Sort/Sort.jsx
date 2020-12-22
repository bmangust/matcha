import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sortStrangers } from "../../store/usersSlice";
import { secondaryColor } from "../../theme";

const useStyles = makeStyles({
  Wrapper: {
    width: "100%",
    margin: "10px 0",
  },
  Active: {
    color: secondaryColor.light,
    fontWeight: "bold",
  },
});

const Sort = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isAsc, setIsAsc] = useState(true);
  const [sortingParam, setSortingParam] = useState(null);

  const sortByUsernameAsc = (userA, userB) => {
    return userA.username.localeCompare(userB.username);
  };
  const sortByUsernameDesc = (userA, userB) => {
    return userB.username.localeCompare(userA.username);
  };
  const sortByAgeAsc = (userA, userB) => {
    return userA.age - userB.age;
  };
  const sortByAgeDesc = (userA, userB) => {
    return userB.age - userA.age;
  };
  const sortByRatingAsc = (userA, userB) => {
    return userA.rating - userB.rating;
  };
  const sortByRatingDesc = (userA, userB) => {
    return userB.rating - userA.rating;
  };
  const sortByLocationAsc = (userA, userB) => {
    return (
      userA.country.localeCompare(userB.country) ||
      userA.city.localeCompare(userB.city)
    );
  };
  const sortByLocationDesc = (userA, userB) => {
    return (
      userB.country.localeCompare(userA.country) ||
      userB.city.localeCompare(userA.city)
    );
  };
  const compFn = useCallback(() => {
    switch (sortingParam) {
      case "username":
        return isAsc ? sortByUsernameAsc : sortByUsernameDesc;
      case "age":
        return isAsc ? sortByAgeAsc : sortByAgeDesc;
      case "rating":
        return isAsc ? sortByRatingAsc : sortByRatingDesc;
      case "location":
        return isAsc ? sortByLocationAsc : sortByLocationDesc;
      default:
        return;
    }
  }, [isAsc, sortingParam]);

  useEffect(() => {
    dispatch(sortStrangers({ compareFunction: compFn() }));
  }, [isAsc, sortingParam, compFn, dispatch]);

  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      className={classes.Wrapper}
    >
      <ButtonGroup variant="outlined">
        <Button
          className={sortingParam === "username" && classes.Active}
          onClick={() => setSortingParam("username")}
        >
          username
        </Button>
        <Button
          className={sortingParam === "age" && classes.Active}
          onClick={() => setSortingParam("age")}
        >
          age
        </Button>
        <Button
          className={sortingParam === "rating" && classes.Active}
          onClick={() => setSortingParam("rating")}
        >
          rating
        </Button>
        <Button
          className={sortingParam === "location" && classes.Active}
          onClick={() => setSortingParam("location")}
        >
          location
        </Button>
      </ButtonGroup>

      <FormControlLabel
        control={
          <Checkbox
            checked={isAsc}
            onChange={() => setIsAsc((state) => !state)}
            name="isAscending"
          />
        }
        label="Ascending order"
      />
    </Grid>
  );
};

export default Sort;
