import {
  Container,
  List,
  ListItem,
  makeStyles,
  Button,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import Input from "../Input/Input";

const useStyles = makeStyles({
  UpdateInfo: {
    width: "100%",
    heigth: "100%",
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

const UpdateInfo = (props) => {
  const classes = useStyles();
  const [username, setUsername] = React.useState(props.username);
  const [email, setEmail] = React.useState(props.email);
  const [phone, setPhone] = React.useState(props.phone);
  const [birthDate, setBirthdate] = React.useState(props.birthDate);
  const [gender, setGender] = React.useState(props.gender);
  const [searchFor, setSearchFor] = React.useState(props.lookFor);
  const [country, setCountry] = React.useState(props.country);
  const [city, setCity] = React.useState(props.city);
  const [maxDistance, setMaxDistance] = React.useState(props.maxDist);
  const [ageRange, setAgeRange] = React.useState([props.minAge, props.maxAge]);
  const [password, setPassword] = React.useState("");
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
    {
      name: "password",
      type: "password",
      label: "Password",
      value: password,
      onChange: (e) => {
        setPassword(e.target.value);
      },
    },
  ];
  return (
    <Container className={classes.UpdateInfo}>
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

const mapStateToProps = (state) => ({
  email: state.general.email,
  username: state.general.username,
  phone: state.general.phone,
  // firstName: state.general.firstName,
  // lastName: state.general.lastName,
  birthDate: state.general.birth_date,
  gender: state.general.gender,
  country: state.general.country,
  city: state.general.city,
  maxDist: state.general.max_dist,
  lookFor: state.general.look_for,
  minAge: state.general.min_age,
  maxAge: state.general.max_age,
});

export default connect(mapStateToProps)(UpdateInfo);
