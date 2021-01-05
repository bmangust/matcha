import { api } from "../../axios";
import { saveNewState } from "../../store/generalSlice";
import { unsanitaze, xssSanitize } from "../../utils";

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
  useLocation: false,

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
      Object.keys(payload).forEach((key) => {
        if (["name", "surname", "bio", "country", "city"].includes(key)) {
          const value = payload[key] || initialAdditionalState[key];
          state[key] = unsanitaze(value);
        } else {
          state[key] = payload[key] || initialAdditionalState[key];
        }
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
    changeUseLocation(state, { payload }) {
      state.useLocation = payload;
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
  changeUseLocation,

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
    useLocation,
  } = {},
  showNotif
) => async (dispatch, getState) => {
  const additionalState = getState().additional;
  const generalState = getState().general;

  const body = {
    id: id || additionalState.id,
    username: username || additionalState.username,
    name: xssSanitize(name) || additionalState.name,
    surname: xssSanitize(surname) || additionalState.surname,
    bio: xssSanitize(bio) || additionalState.bio,
    phone: phone || additionalState.phone,
    birthDate: birthDate || additionalState.birthDate,
    gender: gender || additionalState.gender,
    country: xssSanitize(country) || additionalState.country,
    city: xssSanitize(city) || additionalState.city,
    maxDist: maxDist || additionalState.maxDist,
    lookFor: lookFor || additionalState.lookFor,
    minAge: minAge || additionalState.minAge,
    maxAge: maxAge || additionalState.maxAge,
    useLocation: useLocation || additionalState.useLocation,
  };
  if (generalState.position.lat !== 0 && generalState.position.lon !== 0) {
    body.position = generalState.position;
  }
  console.log(
    "[AdditionalInfoSlice] update user info",
    additionalState,
    generalState,
    body
  );
  if (!body.id) {
    // if didn't get self info yet - try lo send updated info later
    setTimeout(() => dispatch(updateInfo(body)), 1000);
    return;
  }
  let message;
  try {
    if (additionalState.email !== generalState.email) {
      api.put("email/change", {
        email: additionalState.email,
      });
    }
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
      showNotif && showNotif("Successfully saved!", "success");
      return;
    } else {
      message = response.data;
    }
  } catch (e) {
    console.log(e);
    message = "Server error";
  }
  showNotif && showNotif(message, "error");
  dispatch(onUpdateFail());
};

export default additionalSlice.reducer;
