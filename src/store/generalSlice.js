import { createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";
import { xssSanitize } from "../utils";
import { resetUIState } from "./UISlice";
import { resetFilter } from "../pages/Strangers/Filter/filterSlice";

const initialGeneralState = {
  isAuth: false,
  isLoading: false,
  id: "",
  email: "",
  phone: "+7",
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
    saveNewState(state, { payload }) {
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
  saveNewState,
} = generalSlice.actions;

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
