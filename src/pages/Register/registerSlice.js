import { createSlice } from "@reduxjs/toolkit";

const initialRegisterState = {
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  birthDate: "2000-01-01",
  password: "",
  confirm: "",
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
    changeFirsName(state, action) {
      state.firstName = action.payload;
    },
    changeLastName(state, action) {
      state.lastName = action.payload;
    },
    changeBirthDate(state, action) {
      state.birthDate = action.payload;
    },
    changePassword(state, action) {
      state.password = action.payload;
    },
    changeConfirmPassword(state, action) {
      state.confirm = action.payload;
    },
  },
});

export const {
  changeEmail,
  changeUsername,
  changeFirsName,
  changeLastName,
  changeBirthDate,
  changePassword,
  changeConfirmPassword,
} = registerSlice.actions;

export default registerSlice.reducer;
