import { createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";
import { prepareUsers, xssSanitize } from "../utils";
import { resetUIState, setIsInfoMissing } from "./UISlice";
import { resetFilter } from "../components/Filter/filterSlice";
import { setAdditionalState } from "../pages/AdditionalInfo/additionalSlice";

const initialGeneralState = {
  isAuth: false,
  isLoading: false,
  id: "",
  email: "",
  phone: "",
  name: "",
  surname: "",
  username: "",
  bio: "",
  birthDate: 0,
  gender: "",
  country: "",
  city: "",
  maxDist: 0,
  lookFor: "",
  minAge: 0,
  maxAge: 0,
  images: [],
  avatar: null,
  likedBy: [],
  matches: [],
  position: { lat: 0, lon: 0 },
};

const generalSlice = createSlice({
  name: "general",
  initialState: initialGeneralState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    authSuccess(state) {
      state.isAuth = true;
      state.isLoading = false;
    },
    authFail(state) {
      state.isAuth = false;
      state.isLoading = false;
    },
    resetGeneralState: (state) => {
      state.images &&
        state.images.forEach((el) => URL.revokeObjectURL(el.image));
      return initialGeneralState;
    },
    setNewState(state, { payload }) {
      Object.keys(payload).forEach((key) => {
        if (key === "position") {
          state.position.lat = payload.position.lat;
          state.position.lon = payload.position.lon;
        } else if (key === "images" && payload.images) {
          state.images =
            state.images && state.images.length > 0
              ? [...state.images, ...payload[key]]
              : [...payload[key]];
        }
        state[key] = payload[key];
      });
    },
  },
});

export const {
  startLoading,
  stopLoading,
  authSuccess,
  authFail,
  resetGeneralState,
  setNewState,
} = generalSlice.actions;

const checkAuth = (data, dispatch) => {
  // console.log(data);
  let result = null;
  if (data.status) {
    Promise.resolve(prepareUsers([data.data])[0]).then((user) => {
      // console.log(user);
      dispatch(saveNewState(user));
      dispatch(setAdditionalState(user));
      dispatch(authSuccess());
      result = user;
    });
  } else {
    dispatch(resetGeneralState());
  }
  return result;
};

const checkInfo = (info) => {
  let isInfoMissing = false;
  let isAgeRangeMissing = false;
  Object.keys(info).forEach((key) => {
    // skip these keys
    if (
      [
        "tags",
        "position",
        "lookedBy",
        "likedBy",
        "matches",
        "avatar",
        "images",
        "bio",
      ].indexOf(key) !== -1
    )
      return;
    // check if ageRange is default
    if (key === "minAge" || key === "maxAge") {
      isAgeRangeMissing =
        info["maxAge"] === initialGeneralState["maxAge"] &&
        info["minAge"] === initialGeneralState["minAge"];
    } else {
      isInfoMissing = isInfoMissing || info[key] === initialGeneralState[key];
    }
  });
  // console.log(isInfoMissing, isAgeRangeMissing);
  return isInfoMissing || isAgeRangeMissing;
};

export const getSelfInfo = () => async (dispatch) => {
  const res = await api("account");
  dispatch(startLoading());
  if (!checkAuth(res.data, dispatch)) {
    dispatch(authFail());
  }
};

export const saveNewState = (payload) => (dispatch) => {
  let isInfoMissing = checkInfo(payload);
  dispatch(setIsInfoMissing(isInfoMissing));
  dispatch(setNewState(payload));
};

export const auth = (email, password, showNotif) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const body = {
      email: xssSanitize(email),
      password: xssSanitize(password),
    };
    const res = await api.post("/signin", body);
    if (!checkAuth(res.data, dispatch)) {
      showNotif("Email or password is wrong", "error");
    }
  } catch (err) {
    console.log(err);
    dispatch(authFail());
    showNotif("Server error", "error");
  }
};

export const logout = (showNotif) => async (dispatch) => {
  dispatch(startLoading());
  const res = await api.delete("/signout");
  if (res.data.status) {
    dispatch(resetGeneralState());
    dispatch(resetUIState());
    dispatch(resetFilter());
    showNotif("Successful logout");
  } else {
    dispatch(stopLoading());
    showNotif("Server error", "error");
  }
};

export default generalSlice.reducer;
