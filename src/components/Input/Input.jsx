import React, { useEffect, useState } from "react";
import {
  MenuItem,
  TextField,
  Box,
  Slider,
  Typography,
  makeStyles,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import PropTypes from "prop-types";
import TagInput from "../TagInput/TagInput";
import { capitalize } from "lodash";

const useStyles = makeStyles({
  ButtonListItem: {
    justifyContent: "center",
  },
  Input: {
    width: "100%",
  },
  SmallSelector: {
    minWidth: "100px",
    padding: "10px",
  },
  FormControl: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  RadioGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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

/**
 * checks *value* based on *rule* if input was *touched*
 * @param {string} value checked value
 * @param {regex} rule rule to match value
 * @param {boolean} touched flag to check if input was already focused
 */
const validate = (value, rule, touched) => {
  return touched
    ? value.length >= rule.minLength &&
        value.length <= rule.maxLength &&
        value.match(rule.regex)
    : true;
};

const Input = (props) => {
  const classes = useStyles();
  const {
    type,
    label,
    name,
    values,
    value,
    onValidate,
    onChange,
    rules,
    ignoreUntouched, //defaults to false if not passed explictly
    ...rest
  } = {
    ...props,
  };
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const { helperText, rule } = rules
    ? { ...rules }
    : { ...{ helperText: "", rule: null } };

  useEffect(() => {
    let error;
    // check *touched* only if *ignoreUntouched* is false
    error = rule ? !validate(value, rule, ignoreUntouched || touched) : false;
    // update error message
    error ? setErrorText(helperText) : setErrorText("");
    // update inputValid state in Redux
    onValidate && onValidate((ignoreUntouched || touched) && !error);
    setError(error);
  }, [value, rule, touched, helperText, onValidate, ignoreUntouched]);

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
          className={classes.Input}
          onFocus={() => setTouched(true)}
          onChange={(e) => onChange(e)}
          {...rest}
        />
      );
    case "select":
      return (
        <TextField
          id={name}
          key={name}
          label={label}
          value={value}
          className={classes.Input}
          onChange={(e) => onChange(e)}
          select
          {...rest}
        >
          {values.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </TextField>
      );
    case "radio":
      return (
        <FormControl
          className={classes.FormControl}
          key={name}
          component="fieldset"
        >
          <FormLabel component="legend">{capitalize(name)}</FormLabel>
          <RadioGroup
            className={classes.RadioGroup}
            defaultValue={value}
            aria-label={name}
            name={name}
          >
            {values.map((el) => (
              <FormControlLabel
                key={el}
                value={el}
                control={<Radio color="primary" />}
                label={capitalize(el)}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    case "date":
      return (
        <TextField
          id={name}
          type="date"
          label="Birth Date"
          className={classes.Input}
          InputLabelProps={{ shrink: true }}
          value={getDate(value)}
          onChange={(e) => onChange(e)}
          {...rest}
        />
      );
    case "slider":
      return (
        <Box className={classes.Input}>
          <Typography id="range-slider" gutterBottom>
            {label}
          </Typography>
          <Slider
            value={value}
            onChange={(e, value) => onChange(value)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            {...rest}
          />
        </Box>
      );
    case "doubleSelector":
      return (
        <Box key={name} className={classes.Input}>
          <Grid container justify="space-evenly" alignItems="center">
            <Grid item xs={3}>
              <TextField
                id={"min" + name}
                type="number"
                value={value.minAge}
                label="Minimum age"
                className={classes.SmallSelector}
                onChange={(e) => onChange({ minAge: +e.target.value })}
                {...rest}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id={"max" + name}
                type="number"
                value={value.maxAge}
                label="Maximum age"
                className={classes.SmallSelector}
                onChange={(e) => onChange({ maxAge: +e.target.value })}
                {...rest}
              />
            </Grid>
          </Grid>
        </Box>
      );
    case "autocomplete":
      return (
        <TagInput
          name={name}
          className={classes.Input}
          tags={values}
          onChange={onChange}
          {...rest}
        />
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
    "radio",
    "slider",
    "doubleSelector",
    "autocomplete",
  ]).isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  values: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.exact({
      minAge: PropTypes.number,
      maxAge: PropTypes.number,
    }),
  ]),
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
