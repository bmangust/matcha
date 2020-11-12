import { useEffect, useState } from "react";
import { api } from "../axios";

export const useBan = () => {
  const [banned, setBanned] = useState([]);

  useEffect(() => {
    loadBanned();
  }, []);

  const banUser = async (user) => {
    const res = await api.put("ban", { id: user.id });
    console.log(res);
    // update banned here
  };

  const loadBanned = async () => {
    const res = await api("ban");
    console.log(res);
    if (res.data.status) setBanned(res.data.data);
  };

  const unbanUser = async (user) => {
    const res = await api.delete("ban", { id: user.id });
    console.log(res);
    // update banned here
  };

  return { banned, loadBanned, banUser, unbanUser };
};
