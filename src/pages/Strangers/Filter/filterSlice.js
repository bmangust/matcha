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
      console.log(payload);
      state.age = { ...state.age, ...payload };
    },
  },
});

export const { changeUsername, changeSearchAgeRange } = filterSlice.actions;

export default filterSlice.reducer;
