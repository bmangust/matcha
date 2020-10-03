import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  email: "",
  password: "",
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
  },
});

export const { changeEmail, changePassword } = loginSlice.actions;

export default loginSlice.reducer;
