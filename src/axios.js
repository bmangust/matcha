import axios from "axios";
export const CancelToken = axios.CancelToken;

const api = axios.create({
  baseURL: `/api/main/`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  validateStatus: (status) => status >= 200 && status < 500,
});

const media = axios.create({
  baseURL: "/api/media/",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  responseType: "blob",
  validateStatus: (status) => status >= 200 && status < 500,
});

const chatApi = axios.create({
  baseURL: "/api/chat/",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  validateStatus: (status) => status >= 200 && status < 500,
});

// media.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     // console.log(response);
//     return response;
//   },
//   function (error) {
//     // console.log(error);
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(null);
//   }
// );

const mediaUpload = async (id, file, isAvatar = false) => {
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
export { api, media, chatApi, mediaUpload };
