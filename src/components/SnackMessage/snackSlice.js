const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  notifications: [],
};

const snackSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    addSnack(state, { payload }) {
      state.notifications.concat([...payload]);
    },
    dismissSnack(state, { payload }) {
      state.notifications = state.notifications.map((notificaton) =>
        payload.dismissAll || notificaton.key === payload.key
          ? { ...notification, dismissed: true }
          : notification
      );
    },
    removeSnack(state, { payload }) {
      state.notifications = state.notifications.filter(
        (el) => el.key === payload.key
      );
    },
  },
});

export const { addSnack, dismissSnack, removeSnack } = {
  ...snackSlice.actions,
};

export default snackSlice.reducer;
