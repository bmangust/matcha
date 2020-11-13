import { useEffect, useState } from "react";
import { api } from "../axios";

export const banUser = async (id) => {
  const res = await api.put("ban", { id });
  console.log(res);
};

export const unbanUser = async (id) => {
  const res = await api.delete("ban", { id });
  console.log(res);
};

export const useBan = () => {
  const [banned, setBanned] = useState([]);

  const loadBanned = async () => {
    const res = await api("ban");
    console.log(res);
    if (res.data.status) setBanned(res.data.data);
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
