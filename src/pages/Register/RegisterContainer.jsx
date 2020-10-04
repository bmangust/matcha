import React from "react";
import { connect } from "react-redux";
import Register from "./Register";
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

const RegisterContainer = (props) => {
  return <Register {...props} />;
};

const mapStateToProps = (state) => ({
  email: state.register.email,
  username: state.register.username,
  phone: state.register.phone,
  // firstName: state.register.firstName,
  // lastName: state.register.lastName,
  birthDate: state.register.birthDate,
  gender: state.register.gender,
  country: state.register.country,
  city: state.register.city,
  maxDist: state.register.maxDist,
  lookFor: state.register.lookFor,
  minAge: state.register.minAge,
  maxAge: state.register.maxAge,
  password: state.register.password,
  confirm: state.register.confirm,
});

const mapDispatchToProps = {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
