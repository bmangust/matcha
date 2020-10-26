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
  },
  Paper: {
    padding: "20px",
  },
  Header: {},
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
      required: true,
      onChange: (e) => {
        dispatch(changeUsername(e.target.value));
      },
      //   onValidate: (isValid) => {
      //     dispatch(changeUsernameValid(isValid));
      //   },
      //   rules: {
      //     helperText:
      //       "Use letters, numbers or symbols ., %, _, -, +. Min length 3",
      //     rule: {
      //       minLength: 3,
      //       maxLength: 20,
      //       regex: /^[\w%-+.]+$/,
      //     },
      //   },
    },
    {
      name: "ageRange",
      type: "slider",
      label: "Age search range",
      value: age,
      onChange: (value) => {
        dispatch(changeSearchAgeRange(value));
      },
    },
  ];

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
        <Grid container>
          <Grid container justify="space-between" item>
            <Typography component="span">Filter</Typography>
            <Button onClick={updateShowFilter} size="small">
              {showFilter ? <ExpandLessRounded /> : <ExpandMoreRounded />}
            </Button>
          </Grid>
          <Grid className={classes.Inputs} container item direction="column">
            {showFilter &&
              inputs.map(({ name, type, label, value, onChange }) => (
                <Grid key={label} item xs={10}>
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
