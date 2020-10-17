import { createSlice } from "@reduxjs/toolkit";

const initialRegisterState = {
  email: "",
  username: "",
  // firstName: "",
  // lastName: "",
  birthDate: 1577836800000,
  phone: "",
  gender: "male",
  country: "",
  city: "",
  maxDist: 100,
  lookFor: "female",
  minAge: 18,
  maxAge: 25,
  password: "",
  confirm: "",
};

const registerSlice = createSlice({
  name: "register",
  initialState: initialRegisterState,
  reducers: {
    changeEmail(state, action) {
      console.log(action);
      state.email = action.payload;
    },
    changeUsername(state, action) {
      state.username = action.payload;
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
} = registerSlice.actions;

export default registerSlice.reducer;
