import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS, WSNotification } from "../models/ws";

const initialWSState = {
  notifications: [],
};

const WSSlice = createSlice({
  name: "WS",
  initialState: initialWSState,
  reducers: {
    resetWSSlice: () => initialWSState,
    /**
     * payload: WSNotification { id, userId, type, date? }
     */
    addNotification: (state, { payload }) => {
      // some checks for development
      if (!payload.notification) throw new Error("No notification in payload");
      if (!payload.notification.id) throw new Error("No id in payload");
      // check if notification is already there
      if (!state.notifications.some((el) => el.equals(payload.notification)))
        state.notifications.push(new WSNotification(payload.notification));
    },
    /**
     * payload: WSNotification { id, userId, type, date? }
     */
    removeNotification: (state, { payload }) => {
      // some checks for development
      if (!payload.notification) throw new Error("No notification in payload");
      if (!payload.notification.id) throw new Error("No id in payload");
      // check if notification is already there
      const index = state.notifications.findINdex((el) =>
        el.equals(payload.notification)
      );
      if (index !== -1)
        return state.notifications.filter((_, idx) => idx !== index);
    },
  },
});

export const {
  resetWSSlice,
  addNotification,
  removeNotification,
  readNotification,
} = WSSlice.actions;
export default WSSlice.reducer;
