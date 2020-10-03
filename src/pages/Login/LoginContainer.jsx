import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { changeEmail, changePassword } from "./loginSlice";
import { saveNewState } from "../../store/generalSlice";

const LoginContainer = (props) => {
  return <Login {...props} />;
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  password: state.login.password,
});

const mapDispatchToProps = {
  changeEmail,
  changePassword,
  saveNewState,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
