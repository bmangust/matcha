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
  bio: "",
  birthDate: 0,
  gender: "",
  phone: "",
  country: "",
  city: "",
  maxDist: 0,
  lookFor: "",
  minAge: 0,
  maxAge: 100,
  tags: null,

  emailValid: false,
  usernameValid: false,
  nameValid: false,
  surnameValid: false,
  bioValid: false,
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
    changeBio(state, { payload }) {
      state.bio = payload;
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
    changeTags(state, { payload: { value } }) {
      state.tags = value;
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
    changeBioValid(state, { payload }) {
      state.bioValid = payload;
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
  changeBio,
  changeBirthDate,
  changeGender,
  changePhone,
  changeCountry,
  changeCity,
  changeMaxDist,
  changeLookFor,
  changeSearchAgeRange,
  changeTags,

  changeEmailValid,
  changeUsernameValid,
  changeNameValid,
  changeSurnameValid,
  changeBioValid,
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
    bio,
    birthDate,
    phone,
    gender,
    country,
    city,
    maxDist,
    lookFor,
    minAge,
    maxAge,
    tags,
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
    bio: xssSanitize(bio),
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
  let message;
  try {
    const response = await api.put("account", body);
    if (tags && tags.length) {
      const tagsResponse = await api.put("tag", { tags: [...tags] });
      console.log("TAGS", tagsResponse);
      if (tagsResponse.data.status) {
        dispatch(saveNewState({ tags }));
      }
    }

    console.log(response.data.data);
    if (response.data.status) {
      dispatch(saveNewState(body));
      dispatch(onUpdateSuccess());
      showNotif("Successfully saved!");
      dispatch(stopLoading());
      return;
    } else {
      message = response.data;
    }
  } catch (e) {
    message = e;
  }
  dispatch(onUpdateFail());
  console.log(message);
  showNotif("Server error", "error");
  // history.push('/');
  dispatch(stopLoading());
};

export default additionalSlice.reducer;
