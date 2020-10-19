import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../axios";
import { startLoading, stopLoading } from "../../store/generalSlice";
import { xssSanitize } from "../../utils";

const initialRegisterState = {
  email: "",
  username: "",
  password: "",
  confirm: "",
  phone: "+7",
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
    changeEmail(state, action) {
      state.email = action.payload;
    },
    changeUsername(state, action) {
      state.username = action.payload;
    },
    changePassword(state, action) {
      state.password = action.payload;
    },
    changeConfirmPassword(state, action) {
      state.confirm = action.payload;
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
    changePhoneValid(state, { payload }) {
      state.phoneValid = payload;
    },
    onRegisterSuccess(state) {
      state.registerSuccess = true;
    },
    onRegisterFail(state) {
      state.registerSuccess = false;
    },

    // changeFirstName(state, action) {
    //   state.firstName = action.payload;
    // },
    // changeLastName(state, action) {
    //   state.lastName = action.payload;
    // },
    changeBirthDate(state, action) {
      let date = new Date(action.payload).getTime();
      if (!isNaN(date)) state.birthDate = date;
    },
    changePhone(state, action) {
      state.phone = action.payload;
    },
    changeGender(state, action) {
      state.gender = action.payload;
    },
    changeCountry(state, action) {
      state.country = action.payload;
    },
    changeCity(state, action) {
      state.city = action.payload;
    },
    changeMaxDist(state, action) {
      state.maxDist = +action.payload;
    },
    changeLookFor(state, action) {
      state.lookFor = action.payload;
    },
    changeSearchAgeRange(state, action) {
      state.minAge = action.payload[0];
      state.maxAge = action.payload[1];
    },
    changeMaxAge(state, action) {
      state.maxAge = action.payload;
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

  // changeFirstName,
  // changeLastName,
  changePhone,
  changeBirthDate,
  changeGender,
  changeCountry,
  changeCity,
  changeMaxDist,
  changeLookFor,
  changeSearchAgeRange,
} = registerSlice.actions;

export const register = (username, email, password) => async (dispatch) => {
  dispatch(startLoading());
  const body = {
    username: xssSanitize(username),
    email: xssSanitize(email),
    password: xssSanitize(password),
  };
  console.log(body);
  const response = await api.post("signup", body);
  console.log(response.data);
  if (response.data.status === true) {
    dispatch(onRegisterSuccess());
  }
  dispatch(stopLoading());
};

export default registerSlice.reducer;
