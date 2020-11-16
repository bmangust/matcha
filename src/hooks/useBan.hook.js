import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../axios";
import { loadUsers } from "../store/usersSlice";

export const banUser = async (id) => {
  const res = await api.post("ban", { id });
  console.log(res);
};

export const unbanUser = async (id) => {
  const res = await api.request({ url: "ban", method: "delete", data: { id } });
  console.log(res);
};

export const useBan = () => {
  const [banned, setBanned] = useState([]);
  const dispatch = useDispatch();

  const loadBanned = async () => {
    const res = await api("ban");
    console.log(res);
    if (res.data.status) {
      const data = res.data.data || [];
      dispatch(loadUsers(data));
      setBanned(data);
    }
  };

  useEffect(() => {
    loadBanned();
  }, []);

  const banAndUpdate = async (user) => {
    await banUser(user.id);
    if (banned.length) {
      const updatedBanned = [...banned, user.id];
      setBanned(updatedBanned);
    }
  };

  const unbanAndUpdate = async (user) => {
    await unbanUser(user.id);
    if (banned.length) {
      const updatedBanned = banned.filter((id) => id !== user.id);
      setBanned(updatedBanned);
    }
  };

  return { banned, loadBanned, banAndUpdate, unbanAndUpdate };
};
