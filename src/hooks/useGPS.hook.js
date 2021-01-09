import { useDispatch } from "react-redux";
import { api } from "../axios";
import { setNewState } from "../store/generalSlice";

export const useGPS = () => {
  const gps = navigator.geolocation;
  const dispatch = useDispatch();

  const success = (pos) => {
    var crd = pos.coords;

    if (crd) {
      const location = {
        position: {
          lat: crd.latitude,
          lon: crd.longitude,
        },
      };
      dispatch(setNewState(location));
    }
  };

  const error = async (e) => {
    const location = await getLocationByIp();
    if (location.status) dispatch(setNewState(location.data));
  };

  const getCurrentLocaion = () => {
    gps.getCurrentPosition(success, error);
  };

  return { gps, getCurrentLocaion };
};

export const sendCoordinates = async (position) => {
  const res = await api.put("location", position);
  console.log(res.data);
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
        data: { position: { lat: json.lat, lon: json.lon } },
      }));
  } catch (e) {
    console.log(e);
    return { status: false, data: e };
  }
};
