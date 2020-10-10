import {
  Container,
  List,
  ListItem,
  MenuItem,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React from "react";

// const updateInputs = {
//   id: "user id",
//   phone: "89671102000",
//   username: "Liza",
//   age: 17,
//   gender: "female",
//   country: "Russia",
//   city: "Moscow",
//   max_dist: 100,
//   look_for: "male",
//   min_age: 24,
//   max_age: 47,
// };

const inputs = [
  {
    name: "username",
    type: "text",
    label: "Username",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    name: "phone",
    type: "number",
    label: "Phone",
  },
  {
    name: "birthDate",
    type: "date",
    label: "Birth date",
  },
  {
    name: "gender",
    type: "select",
    values: ["male", "female"],
    label: "I'm",
  },
  {
    name: "searchFor",
    type: "select",
    values: ["male", "female", "both"],
    label: "I look for",
  },
  {
    name: "country",
    type: "text",
    label: "Country",
  },
  {
    name: "city",
    type: "text",
    label: "City",
  },
  {
    name: "maxDistance",
    type: "slider",
    label: "Search distance",
  },
  {
    name: "ageRange",
    type: "slider",
    label: "Age search range",
  },
];

const useStyles = makeStyles({
  UpdateInfo: {
    width: "100%",
    heigth: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Select: {
    width: "30em",
  },
});

const UpdateInfo = () => {
  const classes = useStyles();
  return (
    <Container clasName={classes.UpdateInfo}>
      <List>
        {inputs.map((el) => {
          if (el.type === "text" || el.type === "number" || el.text === "email")
            return (
              <ListItem key={el.name}>
                <TextField
                  variant="outlined"
                  type={el.type}
                  label={el.label}
                  value=""
                />
              </ListItem>
            );
          else if (el.type === "select") {
            return (
              <ListItem key={el.name}>
                <TextField
                  key={el.name}
                  className={classes.Select}
                  variant="outlined"
                  label={el.label}
                  value={el.values[0]}
                  select
                >
                  {el.values.map((e) => (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  ))}
                </TextField>
              </ListItem>
            );
          }
        })}
      </List>
    </Container>
  );
};

export default UpdateInfo;
