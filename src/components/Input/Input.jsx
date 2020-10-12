import React from "react";
import {
  MenuItem,
  TextField,
  Box,
  Slider,
  Typography,
  makeStyles,
} from "@material-ui/core";

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

const Input = (props) => {
  const classes = useStyles();
  const { type, label, name, values, value, onChange } = { ...props };
  if (
    type === "text" ||
    type === "number" ||
    type === "email" ||
    type === "password"
  ) {
    return (
      <TextField
        type={type}
        label={label}
        value={value}
        onChange={(e) => onChange(e)}
      />
    );
  } else if (type === "select") {
    return (
      <TextField
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
  } else if (type === "date") {
    return (
      <TextField
        type="date"
        label="Birth Date"
        InputLabelProps={{ shrink: true }}
        value={getDate(value)}
        onChange={(e) => onChange(e)}
      />
    );
  } else if (type === "slider") {
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
  } else {
    return null;
  }
};

export default Input;
