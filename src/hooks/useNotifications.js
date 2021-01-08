import { useDispatch } from "react-redux";
import { addSnack } from "../store/snackSlice";
import { v4 as uuid } from "uuid/dist";
import { CONSTANTS } from "../models/ws";
import { addNotification } from "../store/WSSlice";
import { WSNotification } from "../models/ws";
import { addGeneralValues, removeGeneralValues } from "../store/generalSlice";
import { checkAndUpdateUsers } from "../store/usersSlice";

export const useNotifications = () => {
  const dispatch = useDispatch();

  const handleNotification = (wsNotification) => {
    console.log("[useNotifications] handleNotification", wsNotification);
    if (
      wsNotification.type === CONSTANTS.UPDATE_TYPES.NEW_LIKE ||
      wsNotification.type === CONSTANTS.UPDATE_TYPES.NEW_LOOK ||
      wsNotification.type === CONSTANTS.UPDATE_TYPES.NEW_MATCH ||
      wsNotification.type === CONSTANTS.UPDATE_TYPES.DELETE_MATCH ||
      wsNotification.type === CONSTANTS.UPDATE_TYPES.DELETE_LIKE
    ) {
      const newWSNotification = new WSNotification({
        type: wsNotification.type,
        userId: wsNotification.payload.userId,
      });
      // console.log(newWSNotification);
      dispatch(addNotification({ notification: newWSNotification }));
      dispatch(checkAndUpdateUsers([{ id: wsNotification.payload.userId }]));
    }
    switch (wsNotification.type) {
      case CONSTANTS.UPDATE_TYPES.NEW_LIKE:
        console.log("[useNotifications] NEW_LIKE", wsNotification);
        dispatch(
          addGeneralValues({
            key: "likedBy",
            values: [wsNotification.payload.userId],
          })
        );
        return;
      case CONSTANTS.UPDATE_TYPES.NEW_LOOK:
        dispatch(
          addGeneralValues({
            key: "lookedBy",
            values: [wsNotification.payload.userId],
          })
        );
        return;
      case CONSTANTS.UPDATE_TYPES.NEW_MATCH:
        dispatch(
          addGeneralValues({
            key: "matches",
            values: [wsNotification.payload.userId],
          })
        );
        dispatch(
          removeGeneralValues({
            key: "likedBy",
            values: [wsNotification.payload.userId],
          })
        );
        return;
      case CONSTANTS.UPDATE_TYPES.DELETE_LIKE:
        dispatch(
          removeGeneralValues({
            key: "likedBy",
            values: [wsNotification.payload.userId],
          })
        );
        return;
      case CONSTANTS.UPDATE_TYPES.DELETE_MATCH:
        dispatch(
          removeGeneralValues({
            key: "matches",
            values: [wsNotification.payload.userId],
          })
        );
        return;
      default:
        return;
    }
  };

  const notif = (message, variant, options = {}) => {
    dispatch(
      addSnack({
        key: uuid(),
        text: message.text || message,
        header: message.header,
        variant: variant || "default",
        options: { ...options, autoHideDuration: 3000 },
      })
    );
  };

  const showPrompt = (message, options = {}) => {
    dispatch(
      addSnack({
        key: "message_" + uuid(),
        text: message.text || message,
        header: message.header,
        variant: "prompt",
        options: { ...options, persist: true },
      })
    );
  };
  return { notif, handleNotification, showPrompt };
};
