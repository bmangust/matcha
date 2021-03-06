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
      if (
        !state.notifications.length ||
        !state.notifications.some(
          (el) =>
            el.id === payload.notification.id &&
            el.userId === payload.notification.userId &&
            el.type === payload.notification.type
        )
      )
        state.notifications.push(new WSNotification(payload.notification));
    },
    /**
     * payload: WSNotification { id, userId, type, date? }
     */
    removeNotification: (state, { payload }) => {
      let index = -1;
      // some checks for development
      if (!payload.notification) throw new Error("No notification in payload");
      if (!payload.notification.id) {
        if (!payload.notification.userId || !payload.notification.type)
          throw new Error("No type and userId in payload");

        index = state.notifications.findIndex(
          (el) =>
            el.userId === payload.notification.userId &&
            el.type === payload.notification.type
        );
      } else {
        // check if notification is already there
        index = state.notifications.findIndex((el) =>
          el.equals(payload.notification)
        );
      }
      if (index !== -1)
        state.notifications = state.notifications.filter(
          (_, idx) => idx !== index
        );
    },
    /**
     * payload: { id }
     */
    readNotification: (state, { payload }) => {
      // some checks for development
      if (!payload.id) throw new Error("No id in payload");
      // check if notification is already there
      const index = state.notifications.findIndex((el) => el.id === payload.id);
      if (index !== -1) {
        const updated = state.notifications[index];
        updated.status = CONSTANTS.UPDATE_STATUS.READ;
        const newNotifications = state.notifications
          .slice(0, index)
          .concat(updated)
          .concat(state.notifications.slice(index + 1));
        state.notifications = newNotifications;
      }
    },
    readAllNotifications: (state) => {
      state.notifications = state.notifications.map((notification) => ({
        ...notification,
        status: CONSTANTS.UPDATE_STATUS.READ,
      }));
    },
  },
});

export const {
  resetWSSlice,
  addNotification,
  removeNotification,
  readNotification,
  readAllNotifications,
} = WSSlice.actions;
export default WSSlice.reducer;
