import React from "react";
import { connect } from "react-redux";
import Register from "./Register";
import {
  changeEmail,
  changeUsername,
  changeFirsName,
  changeLastName,
  changeBirthDate,
  changePassword,
  changeConfirmPassword,
} from "./registerSlice";

const RegisterContainer = (props) => {
  return <Register {...props} />;
};

const mapStateToProps = (state) => ({
  email: state.register.email,
  username: state.register.username,
  firstName: state.register.firstName,
  lastName: state.register.lastName,
  birthDate: state.register.birthDate,
  password: state.register.password,
  confirm: state.register.confirm,
});

const mapDispatchToProps = {
  changeEmail,
  changeUsername,
  changeFirsName,
  changeLastName,
  changeBirthDate,
  changePassword,
  changeConfirmPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
