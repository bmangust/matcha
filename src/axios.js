import axios from "axios";

export const api = axios.create({
  baseURL: `/api/main/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const media = axios.create({
  baseURL: "/api/media/",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  responseType: "blob",
});

export const mediaUpload = async (id, file, isAvatar = false) => {
  let formData = new FormData();
  formData.append("id", id);
  formData.append("isAvatar", isAvatar);
  formData.append("userImage", file);
  const res = await axios.post("/api/media/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
