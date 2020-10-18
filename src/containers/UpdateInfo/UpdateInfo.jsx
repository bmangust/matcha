import {
  Container,
  List,
  ListItem,
  makeStyles,
  Button,
} from "@material-ui/core";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { api } from "../../axios";
import { useSnackbar } from "notistack";
import Input from "../../components/Input/Input";
import { saveNewState } from "../../store/generalSlice";

const useStyles = makeStyles({
  UpdateInfo: {
    width: "100%",
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

const UpdateInfo = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [username, setUsername] = React.useState(props.username);
  const [email, setEmail] = React.useState(props.email);
  const [phone, setPhone] = React.useState(props.phone);
  const [birthDate, setBirthdate] = React.useState(props.birthDate);
  const [gender, setGender] = React.useState(props.gender);
  const [lookFor, setLookFor] = React.useState(props.lookFor);
  const [country, setCountry] = React.useState(props.country);
  const [city, setCity] = React.useState(props.city);
  const [maxDistance, setMaxDistance] = React.useState(props.maxDist);
  const [ageRange, setAgeRange] = React.useState([props.minAge, props.maxAge]);
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();

  const changeBirthDate = (newDate) => {
    let date = null;
    if (typeof newDate === "string" && newDate.indexOf("-") === -1) {
      date = new Date(+newDate).getTime();
    } else {
      date = new Date(newDate).getTime();
    }
    if (date && !isNaN(date)) setBirthdate(date);
  };

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
      type: "text",
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
        changeBirthDate(e.target.value);
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
      name: "lookFor",
      type: "select",
      label: "I look for",
      values: ["male", "female", "both"],
      value: lookFor,
      onChange: (e) => {
        setLookFor(e.target.value);
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

  const saveUserInfo = async (e) => {
    e.preventDefault();
    const body = {
      id: props.id,
      email: email,
      username: username,
      birth_date: birthDate,
      phone: phone,
      gender: gender,
      country: country,
      city: city,
      max_dist: maxDistance,
      look_for: lookFor,
      min_age: ageRange[0],
      max_age: ageRange[1],
    };
    if (password.length) {
      body.password = password;
    }
    console.log("[UpdateInfo] update user info");
    console.log(body);
    const response = await api.post("user", body);
    console.log(response.data);

    if (response.data.status) {
      dispatch(saveNewState(body));
      enqueueSnackbar("Successfully saved!", { variant: "success" });
    } else {
      console.log(response.data);
      enqueueSnackbar("Server error", { variant: "error" });
    }
  };

  return (
    <Container>
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
  id: state.general.id,
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
