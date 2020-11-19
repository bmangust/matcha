import { useEffect, useState } from "react";
import { api } from "../axios";

export const useTags = () => {
  const [tags, setTags] = useState([]);

  const fetchTags = async (offset = 0, limit = 10) => {
    const res = await api("tag", { params: { offset, limit } });
    // console.log(res.data);
    if (res.data.status && res.data.data) {
      setTags(res.data.data);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const addTags = (newTags) => {
    const tagsSet = new Set([...tags, ...newTags]);
    setTags([...tagsSet]);
  };

  const removeTags = (oldTags) => {
    const filtered = tags.filter((tag) => !oldTags.find((el) => el === tag));
    setTags(filtered);
  };

  return { tags, fetchTags, addTags, removeTags };
};
