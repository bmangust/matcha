import {
  Container,
  List,
  ListItem,
  makeStyles,
  Button,
} from "@material-ui/core";
import React from "react";
import Input from "../Input/Input";

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
  ButtonListItem: {
    justifyContent: "center",
  },
});

const saveUserInfo = () => {
  console.log("[Update info] saving info");
};

const UpdateInfo = () => {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthDate, setBirthdate] = React.useState(1577836800000);
  const [gender, setGender] = React.useState("male");
  const [searchFor, setSearchFor] = React.useState("female");
  const [country, setCountry] = React.useState("");
  const [city, setCity] = React.useState("");
  const [maxDistance, setMaxDistance] = React.useState(30);
  const [ageRange, setAgeRange] = React.useState([20, 30]);
  const inputs = [
    {
      name: "username",
      type: "text",
      label: "Username",
      value: username,
      onChange: (e) => {
        setUsername(e.target.value);
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      value: email,
      onChange: (e) => {
        setEmail(e.target.value);
      },
    },
    {
      name: "phone",
      type: "number",
      label: "Phone",
      value: phone,
      onChange: (e) => {
        setPhone(e.target.value);
      },
    },
    {
      name: "birthDate",
      type: "date",
      label: "Birth date",
      value: birthDate,
      onChange: (e) => {
        setBirthdate(e.target.value);
      },
    },
    {
      name: "gender",
      type: "select",
      label: "I'm",
      values: ["male", "female"],
      value: gender,
      onChange: (e) => {
        setGender(e.target.value);
      },
    },
    {
      name: "searchFor",
      type: "select",
      label: "I look for",
      values: ["male", "female", "both"],
      value: searchFor,
      onChange: (e) => {
        setSearchFor(e.target.value);
      },
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      value: country,
      onChange: (e) => {
        setCountry(e.target.value);
      },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      value: city,
      onChange: (e) => {
        setCity(e.target.value);
      },
    },
    {
      name: "maxDistance",
      type: "slider",
      label: "Search distance",
      value: maxDistance,
      onChange: (value) => {
        setMaxDistance(value);
      },
    },
    {
      name: "ageRange",
      type: "slider",
      label: "Age search range",
      value: ageRange,
      onChange: (value) => {
        setAgeRange(value);
      },
    },
  ];
  return (
    <Container clasName={classes.UpdateInfo}>
      <List>
        {inputs.map((el) => (
          <ListItem key={el.name}>
            <Input {...el} />
          </ListItem>
        ))}
        <ListItem className={classes.ButtonListItem} key="save">
          <Button size="large" type="submit" onClick={saveUserInfo}>
            Save
          </Button>
        </ListItem>
      </List>
    </Container>
  );
};

export default UpdateInfo;
