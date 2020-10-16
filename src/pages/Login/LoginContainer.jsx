import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { changeEmail, changePassword } from "./loginSlice";
import { saveNewState, auth } from "../../store/generalSlice";

const LoginContainer = (props) => {
  return <Login {...props} />;
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  password: state.login.password,
  isLoading: state.general.isLoading,
});

const mapDispatchToProps = {
  changeEmail,
  changePassword,
  saveNewState,
  auth,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
