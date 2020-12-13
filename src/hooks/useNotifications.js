import { useDispatch } from "react-redux";
import { addSnack } from "../store/snackSlice";

export const useNotifications = () => {
  const dispatch = useDispatch();

  const showNotif = (message, variant, options = {}) => {
    dispatch(
      addSnack({
        key: new Date().getTime() * Math.random(),
        text: message.text || message,
        header: message.header,
        variant: variant || "default",
        options,
      })
    );
  };
  return showNotif;
};
