import React, { useEffect, useState } from "react";
import {
  MenuItem,
  TextField,
  Box,
  Slider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  Select: {
    width: "30em",
  },
  ButtonListItem: {
    justifyContent: "center",
  },
});

const getDate = (timestamp) => {
  const date = new Date(timestamp);
  let year = date.getFullYear();
  if (year < 10) year = "000" + year;
  else if (year < 100) year = "00" + year;
  else if (year < 1000) year = "0" + year;
  else if (year > 3000) year = 3000;
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : "" + month;
  let day = date.getDate();
  day = day < 10 ? "0" + day : "" + day;
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const validate = (value, rule, touched) => {
  return touched
    ? value.length >= rule.minLength &&
        value.length <= rule.maxLength &&
        value.match(rule.regex)
    : true;
};

const Input = (props) => {
  const classes = useStyles();
  const { type, label, name, values, value, onValidate, onChange, rules } = {
    ...props,
  };
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const { helperText, rule } = rules
    ? { ...rules }
    : { ...{ helperText: "", rule: null } };

  useEffect(() => {
    let error = rule ? !validate(value, rule, touched) : false;
    // update error message
    error ? setErrorText(helperText) : setErrorText("");
    // update inputValid state in Redux
    onValidate && onValidate(touched && !error);
    setError(error);
  }, [value, rule, touched, helperText, onValidate]);

  switch (type) {
    case "text":
    case "number":
    case "email":
    case "password":
      return (
        <TextField
          id={name}
          error={error}
          helperText={errorText}
          type={type}
          label={label}
          value={value}
          onFocus={() => setTouched(true)}
          onChange={(e) => onChange(e)}
          className={classes.Input}
        />
      );
    case "select":
      return (
        <TextField
          id={name}
          key={name}
          className={classes.Select}
          label={label}
          value={value}
          onChange={(e) => onChange(e)}
          select
        >
          {values.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </TextField>
      );
    case "date":
      return (
        <TextField
          id={name}
          type="date"
          label="Birth Date"
          InputLabelProps={{ shrink: true }}
          value={getDate(value)}
          onChange={(e) => onChange(e)}
        />
      );
    case "slider":
      return (
        <Box className={classes.Select}>
          <Typography id="range-slider" gutterBottom>
            {label}
          </Typography>
          <Slider
            value={value}
            onChange={(e, value) => onChange(value)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </Box>
      );
    default:
      return null;
  }
};

Input.propTypes = {
  type: PropTypes.oneOf([
    "text",
    "number",
    "password",
    "email",
    "select",
    "date",
    "slider",
  ]).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  values: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onValidate: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  rules: PropTypes.exact({
    rule: PropTypes.exact({
      minLength: PropTypes.number,
      maxLength: PropTypes.number,
      regex: PropTypes.any,
    }),
    helperText: PropTypes.string,
  }),
};

export default Input;
