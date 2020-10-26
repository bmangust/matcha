import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Input/Input";
import { changeUsername, changeSearchAgeRange } from "./filterSlice";
import { ExpandLessRounded, ExpandMoreRounded } from "@material-ui/icons";

const useStyles = makeStyles({
  Filter: {
    position: "fixed",
    left: 0,
    bottom: "39px",
    zIndex: 6,
  },
  Paper: {
    padding: "20px",
    width: "70vw",
  },
  Inputs: {
    width: "100%",
    margin: "10px 0",
  },
  Header: {
    fontSize: "1.5 rem",
    fontWeight: 700,
    textTransform: "uppercase",
  },
});

const Filter = (props) => {
  const classes = useStyles();
  const { username, age } = { ...useSelector((state) => state.filter) };
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);

  const updateShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const inputs = [
    {
      name: "username",
      type: "text",
      label: "Username",
      value: username,
      onChange: (e) => {
        dispatch(changeUsername(e.target.value));
      },
    },
    {
      name: "AgeRange",
      type: "doubleSelector",
      label: "Age search range",
      value: age,
      onChange: (value) => dispatch(changeSearchAgeRange(value)),
    },
  ];

  console.log(age);

  return (
    <Grid
      className={classes.Filter}
      container
      item
      xs={12}
      justify="center"
      self="flex-end"
    >
      <Paper className={classes.Paper}>
        <Grid container direction="column" alignItems="center">
          <Grid container justify="space-evenly" alignItems="center" item>
            <Typography
              className={classes.Header}
              component="span"
              color="secondary"
            >
              Filter
            </Typography>
            <Button onClick={updateShowFilter} size="small" color="secondary">
              {showFilter ? <ExpandLessRounded /> : <ExpandMoreRounded />}
            </Button>
          </Grid>
          <Grid container item direction="column" alignItems="center">
            {showFilter &&
              inputs.map(({ name, type, label, value, onChange }) => (
                <Grid className={classes.Inputs} key={label} item>
                  <Input
                    name={name}
                    type={type}
                    label={label}
                    value={value}
                    onChange={onChange}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Filter;
