const { createSlice } = require("@reduxjs/toolkit");

const inititalFilterState = {
  username: "",
  age: [0, 100],
};

const filterSlice = createSlice({
  name: "filter",
  initialState: inititalFilterState,
  reducers: {
    changeUsername(state, { payload }) {
      state.username = payload;
    },
    changeSearchAgeRange(state, { payload }) {
      state.age = payload;
    },
  },
});

export const { changeUsername, changeSearchAgeRange } = filterSlice.actions;

export default filterSlice.reducer;
