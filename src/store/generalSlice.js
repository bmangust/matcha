import { createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";
import { xssSanitize } from "../utils";
import { resetUIState, setIsInfoMissing } from "./UISlice";
import { resetFilter } from "../pages/Strangers/Filter/filterSlice";
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
  birthDate: 0,
  gender: "",
  country: "",
  city: "",
  maxDist: 0,
  lookFor: "",
  minAge: 0,
  maxAge: 0,
  images: null,
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
    resetGeneralState: () => initialGeneralState,
    setNewState(state, { payload }) {
      Object.keys(payload).forEach((key) => {
        if (key === "position") {
          state.position.lat = payload.position.lat;
          state.position.lon = payload.position.lon;
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

const checkInfo = (info) => {
  let isInfoMissing = false;
  let isAgeRangeMissing = false;
  Object.keys(info).forEach((key) => {
    // check if ageRange is default
    console.log(
      "[checkInfo] " + key,
      info[key],
      initialGeneralState[key],
      isInfoMissing
    );
    if (key === "minAge" || key === "maxAge") {
      isAgeRangeMissing =
        info["maxAge"] === initialGeneralState["maxAge"] &&
        info["minAge"] === initialGeneralState["minAge"];
    }
    isInfoMissing = isInfoMissing || info[key] === initialGeneralState[key];
  });
  console.log("[checkInfo result]", isInfoMissing, isAgeRangeMissing);
  return isInfoMissing || isAgeRangeMissing;
};

export const saveNewState = (payload) => (dispatch) => {
  let isInfoMissing = checkInfo(payload);
  dispatch(setIsInfoMissing(isInfoMissing));
  dispatch(setNewState(payload));
};

export const auth = (email, password, enqueueSnackbar) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const body = {
      email: xssSanitize(email),
      password: xssSanitize(password),
    };
    const res = await api.post("/signin", body);
    if (res.data.status) {
      dispatch(saveNewState(res.data.data));
      dispatch(setAdditionalState(res.data.data));
      dispatch(authSuccess());
    } else {
      dispatch(resetGeneralState());
      enqueueSnackbar("Email or password is wrong", { variant: "error" });
    }
  } catch (err) {
    console.log(err);
    dispatch(authFail());
    enqueueSnackbar("Server error", { variant: "error" });
  }
};

export const logout = (enqueueSnackbar) => async (dispatch) => {
  dispatch(startLoading());
  const res = await api.delete("/signout");
  console.log(res);
  if (res.data.status) {
    dispatch(resetGeneralState());
    dispatch(resetUIState());
    dispatch(resetFilter());
    enqueueSnackbar("Successful logout", { variant: "success" });
  } else {
    dispatch(stopLoading());
    enqueueSnackbar("Server error", { variant: "error" });
  }
};

export default generalSlice.reducer;
