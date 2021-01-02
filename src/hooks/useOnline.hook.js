import { useDispatch, useStore } from "react-redux";
import { setCompanion } from "../store/UISlice";
import { setUsersOnline } from "../store/usersSlice";

export const useOnline = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const getOnlineUsers = () => {
    const users = store.getState().users?.users;
    if (!users) return [];
    const online = users.filter((user) => user.isOnline);
    // console.log("[useOnline] getonlineUsers", online);
    return online;
  };

  const updateOnline = ({ userId, isOnline }) => {
    // console.log("[useOnline] updateOnline", userId, isOnline);
    dispatch(setUsersOnline([{ id: userId, isOnline }]));
    const companion = store.getState().UI.companion;
    if (!companion || companion.id !== userId) return;
    dispatch(setCompanion({ companion: { ...companion, isOnline } }));
  };

  return { getOnlineUsers, updateOnline };
};
