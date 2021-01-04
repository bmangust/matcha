const { createSlice } = require("@reduxjs/toolkit");

const inititalFilterState = {
  username: "",
  city: "",
  country: "",
  gender: "",
  tags: [],
  age: { minAge: 0, maxAge: 100 },
  rating: { min: 0, max: 1 },
};

const filterSlice = createSlice({
  name: "filter",
  initialState: inititalFilterState,
  reducers: {
    changeFilterState(state, { payload }) {
      for (let key in payload) {
        if (["username", "city", "country", "gender", "tags"].includes(key)) {
          state[key] = key === "tags" ? payload[key].value : payload[key];
        } else if (key === "age") {
          state.age.minAge = payload.age[0];
          state.age.maxAge = payload.age[1];
        } else if (key === "rating") {
          state.rating.min = payload.rating[0];
          state.rating.max = payload.rating[1];
        } else {
          throw new Error(`Key <<${key}>> is not allowed`);
        }
      }
    },
    resetFilter(state) {
      state = { ...inititalFilterState };
    },
  },
});

export const { changeFilterState, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
