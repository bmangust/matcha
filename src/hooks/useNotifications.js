import { useDispatch } from "react-redux";
import { addSnack } from "../store/snackSlice";
import { v4 as uuid } from "uuid/dist";
import { CONSTANTS } from "../models/ws";
import { addNotification } from "../store/WSSlice";
import { WSNotification } from "../models/ws";

export const useNotifications = () => {
  const dispatch = useDispatch();

  const handleNotification = (wsNotification) => {
    console.log("[useNotifications] handleNotification", wsNotification);
    if (
      wsNotification.type === CONSTANTS.UPDATE_TYPES.NEW_LIKE ||
      wsNotification.type === CONSTANTS.UPDATE_TYPES.NEW_LOOK ||
      wsNotification.type === CONSTANTS.UPDATE_TYPES.NEW_MATCH
    ) {
      const newWSNotification = new WSNotification({
        type: wsNotification.type,
        userId: wsNotification.payload.userId,
      });
      console.log(newWSNotification);
      dispatch(addNotification({ notification: newWSNotification }));
      // } else if (wsNotification.type === CONSTANTS.UPDATE_TYPES.DELETE_MESSAGE) {
      //   dispatch(removeNotification(wsNotification.payload));
    }
  };

  const notif = (message, variant, options = {}) => {
    dispatch(
      addSnack({
        key: uuid(),
        text: message.text || message,
        header: message.header,
        variant: variant || "default",
        options,
      })
    );
  };
  return { notif, handleNotification };
};
