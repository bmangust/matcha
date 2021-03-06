import { createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";
import { getCookie, prepareUsers, unsanitaze, xssSanitize } from "../utils";
import { resetUIState, setIsInfoMissing } from "./UISlice";
import { resetFilter } from "../components/Filter/filterSlice";
import { setAdditionalState } from "../pages/AdditionalInfo/additionalSlice";
import { WSdisconnect } from "../hooks/useWS.hook";

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
  useLocation: null,
  likedBy: [],
  matches: [],
  likes: [],
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
          if (payload.position.lat) state.position.lat = payload.position.lat;
          if (payload.position.lon) state.position.lon = payload.position.lon;
        } else if (key === "images" && payload.images) {
          state.images = [...payload.images];
        } else if (
          ["name", "surname", "bio", "country", "city"].includes(key)
        ) {
          state[key] = unsanitaze(payload[key]);
        } else {
          state[key] = payload[key];
        }
      });
    },
    addGeneralValues(state, { payload }) {
      console.log(payload);
      if (!payload.key || !payload.values)
        throw new Error("[addGeneralValues] no key or value in payload");
      const stateValues = state[payload.key];
      const updatedValues = [...stateValues, ...payload.values];
      // console.log(stateValues, updatedValues);
      state[payload.key] = [...new Set(updatedValues)];
    },
    removeGeneralValues(state, { payload }) {
      console.log(payload);
      if (!payload.key || !payload.values)
        throw new Error("[addGeneralValues] no key or value in payload");
      state[payload.key] =
        state[payload.key].filter((el) => !payload.values.includes(el)) || [];
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
  addGeneralValues,
  removeGeneralValues,
} = generalSlice.actions;

const updateSelfInfo = async (data, dispatch) => {
  // console.log(data);
  dispatch(saveNewState(data.data));
  dispatch(authSuccess());
  dispatch(setAdditionalState(data.data));
  try {
    const user = await Promise.resolve(prepareUsers([data.data])[0]);
    const myLikes = await api.get("like");
    user.likes = myLikes.data.status ? myLikes.data.data : [];
    // console.log(user);
    if (user) {
      dispatch(saveNewState(user));
      dispatch(setAdditionalState(user));
    }
  } catch (e) {}
};

export const checkInfo = (info) => {
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
        "useLocation",
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

export const checkAuth = () => async (dispatch) => {
  try {
    if (!getCookie("session_id")) {
      return;
    }
    dispatch(startLoading());
    const res = await api("account");
    if (res.data.status) {
      await updateSelfInfo(res.data, dispatch);
    } else {
      dispatch(authFail());
    }
  } catch (e) {
    dispatch(authFail());
  }
};

export const saveNewState = (payload) => (dispatch) => {
  let isInfoMissing = checkInfo(payload);
  dispatch(setIsInfoMissing(isInfoMissing));
  dispatch(setNewState(payload));
};

export const auth = (email, password, showNotif) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  const position = getState().general.position;
  try {
    const body = email.match(/([\w%+-.]+)@([\w-]+\.)+([\w]{2,})/i)
      ? {
          email: xssSanitize(email),
          password: xssSanitize(password),
        }
      : {
          username: xssSanitize(email),
          password: xssSanitize(password),
        };
    if (position.lat) body.useLocation = true;
    const params =
      position.lat === 0 || position.lon === 0
        ? {}
        : {
            headers: {
              latitude: position.lat,
              longitude: position.lon,
            },
          };
    const res = await api.post("/signin", body, params);
    if (res.data.status) {
      updateSelfInfo(res.data, dispatch);
    } else {
      dispatch(authFail());
      dispatch(resetGeneralState());
      showNotif(res.data.data, "error");
    }
  } catch (err) {
    // console.log(err);
    dispatch(authFail());
    showNotif("Server error", "error");
  }
};

export const logout = (showNotif) => async (dispatch) => {
  dispatch(startLoading());
  WSdisconnect();
  try {
    const res = await api.delete("/signout");
    if (res.data.status) {
      showNotif("Successful logout", "success");
      dispatch(resetGeneralState());
      dispatch(resetUIState());
      dispatch(resetFilter());
    } else {
      throw new Error(res.data.data);
    }
  } catch (e) {
    dispatch(stopLoading());
    showNotif("Server error", "error");
  }
};

export const deleteAccount = (showNotif) => async (dispatch) => {
  try {
    const res = await api.delete("account");
    console.log(res.data);
    if (res.data.status) {
      showNotif("Account successfully deleted", "success");
      dispatch(resetGeneralState());
      dispatch(resetUIState());
      dispatch(resetFilter());
    } else {
      throw new Error(res.data.data);
    }
  } catch (e) {
    dispatch(stopLoading());
    showNotif(e, "error");
  }
};

export default generalSlice.reducer;
