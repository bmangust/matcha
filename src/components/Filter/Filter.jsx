import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotifications } from "../../hooks/useNotifications";
import { loadStrangers } from "../../store/usersSlice";
import Input from "../Input/Input";
import { changeFilterState } from "./filterSlice";

const useStyles = makeStyles({
  Inputs: {
    width: "100%",
    margin: "10px 0",
  },
});

const Filter = () => {
  const classes = useStyles();
  const { username, city, country, gender, tags, age, rating } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const { notif } = useNotifications();

  const inputs = [
    {
      name: "username",
      type: "text",
      label: "Username",
      value: username,
      onChange: (e) => {
        dispatch(changeFilterState({ username: e.target.value }));
      },
    },
    {
      name: "ageRange",
      type: "slider",
      label: "Age range",
      value: [age.minAge, age.maxAge],
      onChange: (value) => dispatch(changeFilterState({ age: value })),
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      value: country,
      onChange: (e) => {
        dispatch(changeFilterState({ country: e.target.value }));
      },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      value: city,
      onChange: (e) => {
        dispatch(changeFilterState({ city: e.target.value }));
      },
    },
    {
      name: "gender",
      type: "radio",
      label: "I look for",
      values: ["male", "female", "both"],
      value: gender,
      onChange: (e) => {
        dispatch(changeFilterState({ gender: e.target.value }));
      },
    },
    {
      name: "rating",
      type: "slider",
      label: "Rating range",
      value: [rating.min, rating.max],
      min: 0,
      max: 1,
      step: 0.05,
      onChange: (value) => dispatch(changeFilterState({ rating: value })),
    },
    {
      name: "tags",
      type: "autocomplete",
      values: tags,
      onChange: (values) => {
        dispatch(changeFilterState({ tags: values }));
      },
    },
  ];

  const handleSerach = () => {
    dispatch(
      loadStrangers(notif, { username, city, country, gender, tags, age })
    );
  };

  return (
    <>
      {inputs.map(({ name, type, label, value, values, onChange, ...rest }) => (
        <Grid className={classes.Inputs} key={name} item xs={12}>
          <Input
            name={name}
            type={type}
            label={label}
            value={value}
            values={values}
            onChange={onChange}
            {...rest}
          />
        </Grid>
      ))}
      <Button style={{ margin: "10px 0" }} onClick={handleSerach}>
        get new strangers
      </Button>
    </>
  );
};

export default Filter;
