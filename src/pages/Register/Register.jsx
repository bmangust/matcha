import * as React from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { api } from "../../axios";
import {
  Button,
  makeStyles,
  Container,
  List,
  ListItem,
} from "@material-ui/core";
import { theme } from "../../theme";
import Input from "../../components/Input/Input";
import {
  changeEmail,
  changeUsername,
  changePhone,
  // changeFirstName,
  // changeLastName,
  changeBirthDate,
  changeGender,
  changeCountry,
  changeCity,
  changeMaxDist,
  changeLookFor,
  changeSearchAgeRange,
  changePassword,
  changeConfirmPassword,
} from "./registerSlice";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  Input: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  Form: {
    width: "50%",
    textAlign: "center",
  },
  Button: {
    margin: "8px",
  },
});

const Register = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const {
    email,
    username,
    password,
    confirm,
    birthDate,
    phone,
    gender,
    country,
    city,
    maxDist,
    lookFor,
    minAge,
    maxAge,
  } = useSelector((state) => state.register);

  const onLoginHandler = (history) => {
    history.push("/login");
  };

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
      username: username,
      password: password,
      birth_date: birthDate,
      phone: phone,
      gender: gender,
      country: country,
      city: city,
      max_dist: maxDist,
      look_for: lookFor,
      min_age: minAge,
      max_age: maxAge,
    };
    console.log(body);
    const response = await api.post("signup", body);
    console.log(response.data);
    if (response.data.status === true) {
      history.push("login");
    } else {
      enqueueSnackbar(response.data.data, { variant: "error" });
    }
  };

  const inputs = [
    {
      name: "username",
      type: "text",
      label: "Username",
      value: username,
      onChange: (e) => {
        dispatch(changeUsername(e.target.value));
      },
    },
    // {
    //   name: "firstName",
    //   type: "text",
    //   label: "First name",
    //   value: firstName,
    //   onChange: (e) => {
    //     dispatch(changeFirstName(e.target.value));
    //   },
    // },
    // {
    //   name: "lastName",
    //   type: "text",
    //   label: "Last name",
    //   value: lastName,
    //   onChange: (e) => {
    //     dispatch(changeLastName(e.target.value));
    //   },
    // },
    {
      name: "email",
      type: "email",
      label: "Email",
      value: email,
      onChange: (e) => {
        dispatch(changeEmail(e.target.value));
      },
    },
    {
      name: "phone",
      type: "text",
      label: "Phone",
      value: phone,
      onChange: (e) => {
        dispatch(changePhone(e.target.value));
      },
    },
    {
      name: "birthDate",
      type: "date",
      label: "Birth date",
      value: birthDate,
      onChange: (e) => {
        dispatch(changeBirthDate(e.target.value));
      },
    },
    {
      name: "gender",
      type: "select",
      label: "I'm",
      values: ["male", "female"],
      value: gender,
      onChange: (e) => {
        dispatch(changeGender(e.target.value));
      },
    },
    {
      name: "lookFor",
      type: "select",
      label: "I look for",
      values: ["male", "female", "both"],
      value: lookFor,
      onChange: (e) => {
        dispatch(changeLookFor(e.target.value));
      },
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      value: country,
      onChange: (e) => {
        dispatch(changeCountry(e.target.value));
      },
    },
    {
      name: "city",
      type: "text",
      label: "City",
      value: city,
      onChange: (e) => {
        dispatch(changeCity(e.target.value));
      },
    },
    {
      name: "maxDistance",
      type: "slider",
      label: "Search distance",
      value: maxDist,
      onChange: (value) => {
        dispatch(changeMaxDist(value));
      },
    },
    {
      name: "ageRange",
      type: "slider",
      label: "Age search range",
      value: [minAge, maxAge],
      onChange: (value) => {
        dispatch(changeSearchAgeRange(value));
      },
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      value: password,
      onChange: (e) => {
        dispatch(changePassword(e.target.value));
      },
    },
    {
      name: "confirm",
      type: "password",
      label: "Confirm",
      value: confirm,
      onChange: (e) => {
        dispatch(changeConfirmPassword(e.target.value));
      },
    },
  ];

  return (
    <Container>
      <form className={classes.Form}>
        <List>
          {inputs.map((el) => (
            <ListItem key={el.name}>
              <Input {...el} />
            </ListItem>
          ))}

          <Button
            className={classes.Button}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={(e) => onRegisterHandler(e)}
          >
            Sign up
          </Button>
          <Button
            className={classes.Button}
            color="primary"
            size="large"
            onClick={() => onLoginHandler(history)}
          >
            Already a member?
          </Button>
        </List>
      </form>
    </Container>
  );
};

export default Register;
