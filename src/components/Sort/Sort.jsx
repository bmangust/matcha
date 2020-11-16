import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import Input from "../Input/Input";
// import { changeUsername, changeSearchAgeRange } from "./filterSlice";

const useStyles = makeStyles({
  Inputs: {
    width: "100%",
    margin: "10px 0",
  },
});

const Sort = () => {
  const classes = useStyles();
  //   const { username, age } = { ...useSelector((state) => state.filter) };
  const dispatch = useDispatch();

  //   const inputs = [
  //     {
  //       name: "username",
  //       type: "text",
  //       label: "Username",
  //       value: username,
  //       onChange: (e) => {
  //         dispatch(changeUsername(e.target.value));
  //       },
  //     },
  //     {
  //       name: "AgeRange",
  //       type: "doubleSelector",
  //       label: "Age search range",
  //       value: age,
  //       onChange: (value) => dispatch(changeSearchAgeRange(value)),
  //     },
  //   ];

  return (
    <>
      {/* {inputs.map(({ name, type, label, value, onChange }) => (
        <Grid className={classes.Inputs} key={label} item xs={12} md={6}>
          <Input
            name={name}
            type={type}
            label={label}
            value={value}
            onChange={onChange}
          />
        </Grid>
      ))} */}
      <Grid className={classes.Inputs}>Sort</Grid>
    </>
  );
};

export default Sort;
