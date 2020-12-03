import { useSnackbar } from "notistack";

export const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showNotif = (message, variant = "success", options = {}) => {
    enqueueSnackbar(message, { variant, ...options });
  };

  return showNotif;
};
