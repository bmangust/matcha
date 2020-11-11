import { api } from "../../axios";
import { saveNewState } from "../../store/generalSlice";
import { startLoading, stopLoading } from "../../store/generalSlice";
import { getLocationByIp, xssSanitize } from "../../utils";

const { createSlice } = require("@reduxjs/toolkit");

const initialAdditionalState = {
  id: "",
  email: "",
  name: "",
  surname: "",
  username: "",
  birthDate: 0,
  gender: "",
  phone: "",
  country: "",
  city: "",
  maxDist: 0,
  lookFor: "",
  minAge: 0,
  maxAge: 100,

  emailValid: false,
  usernameValid: false,
  nameValid: false,
  surnameValid: false,
  countryValid: false,
  cityValid: false,

  updateSuccess: false,
};

const additionalSlice = createSlice({
  name: "additional",
  initialState: initialAdditionalState,
  reducers: {
    setAdditionalState(state, { payload }) {
      Object.keys(initialAdditionalState).forEach((key) => {
        state[key] = payload[key] || initialAdditionalState[key];
      });
    },
    resetAdditionalState: () => initialAdditionalState,
    changeEmail(state, { payload }) {
      state.email = payload;
    },
    changeUsername(state, { payload }) {
      state.username = payload;
    },
    changeName(state, { payload }) {
      state.name = payload;
    },
    changeSurname(state, { payload }) {
      state.surname = payload;
    },
    changeBirthDate(state, { payload }) {
      let date = new Date(payload).getTime();
      if (!isNaN(date)) state.birthDate = date;
    },
    changeGender(state, { payload }) {
      state.gender = payload;
    },
    changePhone(state, { payload }) {
      state.phone = payload;
    },
    changeCountry(state, { payload }) {
      state.country = payload;
    },
    changeCity(state, { payload }) {
      state.city = payload;
    },
    changeMaxDist(state, { payload }) {
      state.maxDist = +payload;
    },
    changeLookFor(state, { payload }) {
      state.lookFor = payload;
    },
    changeSearchAgeRange(state, { payload }) {
      state.minAge = payload[0];
      state.maxAge = payload[1];
    },
    changeMinAge(state, { payload }) {
      state.minAge = payload;
    },
    changeMaxAge(state, { payload }) {
      state.maxAge = payload;
    },

    changeEmailValid(state, { payload }) {
      state.emailValid = payload;
    },
    changeUsernameValid(state, { payload }) {
      state.usernameValid = payload;
    },
    changeNameValid(state, { payload }) {
      state.nameValid = payload;
    },
    changeSurnameValid(state, { payload }) {
      state.surnameValid = payload;
    },
    changePhoneValid(state, { payload }) {
      state.phoneValid = payload;
    },
    changeCountryValid(state, { payload }) {
      state.countryValid = payload;
    },
    changeCityValid(state, { payload }) {
      state.cityValid = payload;
    },
    onUpdateSuccess(state) {
      state.updateSuccess = true;
    },
    onUpdateFail(state) {
      state.updateSuccess = false;
    },
  },
});

export const {
  setAdditionalState,
  resetAdditionalState,

  changeEmail,
  changeUsername,
  changeName,
  changeSurname,
  changeBirthDate,
  changeGender,
  changePhone,
  changeCountry,
  changeCity,
  changeMaxDist,
  changeLookFor,
  changeSearchAgeRange,

  changeEmailValid,
  changeUsernameValid,
  changeNameValid,
  changeSurnameValid,
  changePhoneValid,
  changeCountryValid,
  changeCityValid,
  onUpdateSuccess,
  onUpdateFail,
} = additionalSlice.actions;

export const updateInfo = (
  {
    id,
    username,
    name,
    surname,
    birthDate,
    phone,
    gender,
    country,
    city,
    maxDist,
    lookFor,
    minAge,
    maxAge,
  },
  showNotif,
  history
) => async (dispatch) => {
  dispatch(startLoading());

  const body = {
    id,
    username,
    name: xssSanitize(name),
    surname: xssSanitize(surname),
    phone,
    birthDate,
    gender,
    country: xssSanitize(country),
    city: xssSanitize(city),
    maxDist,
    lookFor,
    minAge,
    maxAge,
  };
  try {
    const location = await getLocationByIp();
    if (location.status) body.position = location.data;
  } catch (e) {
    console.log("Getting location failed");
  }
  console.log("[AdditionalInfoSlice] update user info");
  console.log(body);
  const response = await api.post("user", body);

  console.log(response.data.data);
  if (response.data.status) {
    dispatch(saveNewState(body));
    dispatch(onUpdateSuccess());
    showNotif("Successfully saved!");
  } else {
    console.log(response.data);
    dispatch(onUpdateFail());
    showNotif("Server error", "error");
  }
  // history.push('/');
  dispatch(stopLoading());
};

export default additionalSlice.reducer;