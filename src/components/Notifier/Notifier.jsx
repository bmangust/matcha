import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSnack } from "../../store/snackSlice";

let displayed = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.snack.notifications);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };
  const removeDisplayed = (id) => {
    displayed = displayed.filter((key) => id !== key);
  };

  useEffect(() => {
    notifications.forEach(({ key, text, options = {}, dismissed = false }) => {
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(text, {
        key,
        ...options,
        onClose: (event, reason, key) => {
          if (options.onClose) {
            options.onClose(event, reason, key);
          }
        },
        onExited: (event, key) => {
          // remove this snackbar from redux store
          dispatch(removeSnack({ key }));
          removeDisplayed(key);
        },
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, enqueueSnackbar, dispatch, closeSnackbar]);

  return null;
};

export default Notifier;
