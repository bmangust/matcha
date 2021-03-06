import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../axios";
import { startLoading, stopLoading } from "../../store/generalSlice";
import { xssSanitize } from "../../utils";

const initialRegisterState = {
  email: "",
  username: "",
  password: "",
  confirm: "",
  emailValid: false,
  usernameValid: false,
  passwordValid: false,
  confirmValid: false,
  phoneValid: false,
  registerSuccess: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState: initialRegisterState,
  reducers: {
    changeEmail(state, { payload }) {
      state.email = payload;
    },
    changeUsername(state, { payload }) {
      state.username = payload;
    },
    changePassword(state, { payload }) {
      state.password = payload;
    },
    changeConfirmPassword(state, { payload }) {
      state.confirm = payload;
    },

    changeEmailValid(state, { payload }) {
      state.emailValid = payload;
    },
    changeUsernameValid(state, { payload }) {
      state.usernameValid = payload;
    },
    changePasswordValid(state, { payload }) {
      state.passwordValid = payload;
    },
    changeConfirmValid(state, { payload }) {
      state.confirmValid = payload;
    },

    onRegisterSuccess(state) {
      state = { ...initialRegisterState, registerSuccess: true };
    },
    onRegisterFail(state) {
      state.registerSuccess = false;
    },
  },
});

export const {
  changeEmail,
  changeUsername,
  changePassword,
  changeConfirmPassword,

  changeEmailValid,
  changeUsernameValid,
  changePasswordValid,
  changeConfirmValid,
  changePhoneValid,
  onRegisterSuccess,
  onRegisterFail,
} = registerSlice.actions;

export const register = (
  username,
  email,
  password,
  showNotif,
  history
) => async (dispatch) => {
  dispatch(startLoading());
  const body = {
    username: xssSanitize(username),
    email: xssSanitize(email),
    password: xssSanitize(password),
  };
  // console.log(body);
  try {
    const response = await api.post("signup", body);
    // console.log(response.data);
    if (response.data.status === true) {
      dispatch(onRegisterSuccess());
      showNotif("Account successfully created, now login", "success");
      history.push("/login");
    } else {
      showNotif(response.data.data, "error");
    }
  } catch (e) {
    console.log(e);
    showNotif("server error", "error");
  }
  dispatch(stopLoading());
};

export default registerSlice.reducer;
