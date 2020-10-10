import { createSlice } from "@reduxjs/toolkit";

const initialGeneralState = {
  id: "",
  email: "",
  phone: "",
  username: "",
  birthDate: 0,
  gender: "",
  country: "",
  city: "",
  max_dist: 0,
  look_for: "",
  min_age: 0,
  max_age: 0,
  images: null,
  liked_by: [],
  matches: [],
  position: { lat: 0, lon: 0 },
};

const generalSlice = createSlice({
  name: "general",
  initialState: initialGeneralState,
  reducers: {
    saveNewState(state, action) {
      console.log(action.payload);
      Object.keys(initialGeneralState).forEach((key) => {
        if (key === "position") {
          state.position.lat = action.payload.position.lat;
          state.position.lon = action.payload.position.lon;
        }
        state[key] = action.payload[key];
      });
    },
  },
});

export const { saveNewState } = generalSlice.actions;

export default generalSlice.reducer;
