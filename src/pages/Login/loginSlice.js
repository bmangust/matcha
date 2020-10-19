import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  email: "",
  password: "",
  emailValid: false,
  passwordValid: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    changeEmail(state, action) {
      state.email = action.payload;
    },
    changePassword(state, action) {
      state.password = action.payload;
    },
    changeEmailValid(state, { payload }) {
      state.emailValid = payload;
    },
    changePasswordValid(state, { payload }) {
      state.passwordValid = payload;
    },
  },
});

export const {
  changeEmail,
  changePassword,
  changeEmailValid,
  changePasswordValid,
} = loginSlice.actions;

export default loginSlice.reducer;
