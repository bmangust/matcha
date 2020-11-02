import { useSnackbar } from "notistack";

export const useNotifications = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showNotif = (message, variant = "success") => {
    enqueueSnackbar(message, { variant });
  };

  return showNotif;
};
