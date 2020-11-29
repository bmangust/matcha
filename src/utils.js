import { CancelToken, media } from "./axios";
import Axios from "axios";

export const xssSanitize = (value) => {
  var lt = /</g,
    gt = />/g,
    ap = /'/g,
    ic = /"/g;
  return value
    ? value
        .toString()
        .replace(lt, "&lt;")
        .replace(gt, "&gt;")
        .replace(ap, "&#39;")
        .replace(ic, "&#34;")
    : "";
};

export const getLocationByIp = async () => {
  try {
    return await fetch("https://www.cloudflare.com/cdn-cgi/trace")
      .then((response) => response.text())
      .then((res) => {
        const regex = /(?<=(ip=))([\d.]+)/g;
        const ip = res.match(regex)[0];
        return ip;
      })
      .then((ip) => fetch(`http://ip-api.com/json/${ip}`))
      .then((res) => res.json())
      .then((json) => ({
        status: true,
        data: { lat: json.lat, lon: json.lon },
      }));
  } catch (e) {
    console.log(e);
    return { status: false, data: e };
  }
};
const source = CancelToken.source();

export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const loadImages = async (user) => {
  const images = user.images;
  if (!images || images.length === 0) return { ...user, images: [] };

  // console.log("fetching images for user: ", user);
  // console.log("images: ", images);
  try {
    const promises = images.map((img) =>
      media(`img/${img}`, { cancelToken: source.token })
    );
    const resolvedPromises = await Promise.allSettled(promises);
    // console.log("image promises", resolvedPromises);
    const fetchedImages = resolvedPromises
      .filter((img) => img.status === "fulfilled")
      .map((img) => {
        // console.log(img);
        const file = URL.createObjectURL(img.value.data);
        const image = { id: img.value.config.url.split("/")[1], image: file };
        // console.log("image", image);
        return image;
      });
    // console.log("fetchedImages", fetchedImages);
    const updatedUser = { ...user, images: fetchedImages };
    updatedUser.avatar = updatedUser.images.find(
      (img) => img.id === user.avatar
    );
    return updatedUser;
  } catch (e) {
    if (Axios.isCancel(e)) {
      console.log("Request cancelled");
    }
    return user;
  }
};

export const addAge = (user) => {
  const age = new Date().getFullYear() - new Date(user.birthDate).getFullYear();
  return { ...user, age };
};

export const prepareUsers = (users) => {
  return users.map((user) => addAge(user)).map((user) => loadImages(user));
};

export const throttle = (f) => {
  let store = {
    isCooldown: false,
    args: null,
    savedthis: null,
  };
  function wrapper() {
    if (store.isCooldown) {
      store.savedthis = this;
      store.args = arguments;
      return;
    }

    f.apply(this, arguments);
    store.isCooldown = true;
    setTimeout(() => {
      store.isCooldown = false;
      if (store.args) f.apply(store.savedthis, store.args);
      store.args = store.savedthis = null;
    }, 30);
  }

  return wrapper;
};

export const getCookie = (name) => {
  const allCookies = document.cookie;
  console.log(allCookies);
  let matches = allCookies.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  const cookie = matches ? decodeURIComponent(matches[1]) : undefined;
  if (cookie === undefined) {
    cookie = allCookies
      .split(";")
      .find((el) => el.match(/session_id.+/))
      .split("=")[1]
      .trim();
  }
  return cookie;
};
