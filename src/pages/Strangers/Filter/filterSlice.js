const { createSlice } = require("@reduxjs/toolkit");

const inititalFilterState = {
  username: "",
  age: { minAge: 0, maxAge: 100 },
};

const filterSlice = createSlice({
  name: "filter",
  initialState: inititalFilterState,
  reducers: {
    changeUsername(state, { payload }) {
      state.username = payload;
    },
    changeSearchAgeRange(state, { payload }) {
      state.age = { ...state.age, ...payload };
    },
    resetFilter(state) {
      state = { ...inititalFilterState };
    },
  },
});

export const { changeUsername, changeSearchAgeRange, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
