import { useDispatch, useSelector } from "react-redux";
import { api } from "../axios";
import { setBanned, setStrangers } from "../store/usersSlice";

export const banUser = async (id) => {
  try {
    const res = await api.post("ban", { id });
    return res.data.status;
  } catch (e) {}
};

export const unbanUser = async (id) => {
  try {
    const res = await api.delete(`ban/${id}`);
    return res.data.status;
  } catch (e) {}
};

export const useBan = () => {
  const dispatch = useDispatch();
  const { strangers, banned } = useSelector((state) => state.users);

  const banAndUpdate = async (userId) => {
    await banUser(userId);
    const filteredStrangers = strangers.filter((user) => user.id !== userId);
    dispatch(setStrangers(filteredStrangers));
    const updatedBanned = [...banned, userId];
    dispatch(setBanned(updatedBanned));
  };

  const unbanAndUpdate = async (userId) => {
    const res = await unbanUser(userId);
    if (banned.length && res) {
      const updatedBanned = banned.filter((id) => id !== userId);
      dispatch(setBanned(updatedBanned));
    }
  };

  return { banned, banAndUpdate, unbanAndUpdate };
};
