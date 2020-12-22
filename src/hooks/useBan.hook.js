import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../axios";
import { loadUsers, setStrangers } from "../store/usersSlice";

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
  const [banned, setBanned] = useState([]);
  const dispatch = useDispatch();
  const strangers = useSelector((state) => state.users.strangers);

  const loadBanned = async () => {
    console.log("[useBan] loadBanned");
    try {
      const res = await api("ban");
      if (res.data.status) {
        const data = res.data.data || [];
        console.log(data);
        dispatch(loadUsers(data));
        setBanned(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    console.log("[useBan] useEffect");
    loadBanned();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const banAndUpdate = async (userId) => {
    console.log("[useBan]banAndUpdate");
    await banUser(userId);
    const filteredStrangers = strangers.filter((user) => user.id !== userId);
    dispatch(setStrangers(filteredStrangers));
    const updatedBanned = [...banned, userId];
    setBanned(updatedBanned);
  };

  const unbanAndUpdate = async (userId) => {
    const res = await unbanUser(userId);
    if (banned.length && res) {
      const updatedBanned = banned.filter((id) => id !== userId);
      setBanned(updatedBanned);
    }
  };

  return { banned, banAndUpdate, unbanAndUpdate };
};
