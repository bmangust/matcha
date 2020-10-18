import { createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";
import { resetUIState } from "./UISlice";

const initialGeneralState = {
  isAuth: false,
  isLoading: false,
  id: "",
  email: "",
  phone: "",
  username: "",
  birth_date: 0,
  gender: "",
  country: "",
  city: "",
  max_dist: 0,
  look_for: "",
  min_age: 0,
  max_age: 0,
  images: null,
  avatar: null,
  liked_by: [],
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
    saveNewState(state, action) {
      Object.keys(action.payload).forEach((key) => {
        if (key === "position") {
          state.position.lat = action.payload.position.lat;
          state.position.lon = action.payload.position.lon;
        }
        state[key] = action.payload[key];
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
    const res = await api.post("/signin", { email, password });
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
    enqueueSnackbar("Successful logout", { variant: "success" });
  } else {
    dispatch(stopLoading());
    enqueueSnackbar("Server error", { variant: "error" });
  }
};

export default generalSlice.reducer;
