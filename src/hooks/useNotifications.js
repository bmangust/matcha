import { useDispatch } from "react-redux";
import { addSnack } from "../store/snackSlice";
import { v4 as uuid } from "uuid/dist";

export const useNotifications = () => {
  const dispatch = useDispatch();

  const showNotif = (message, variant, options = {}) => {
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
  return showNotif;
};
