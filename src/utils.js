export const xssSanitize = (value) => {
  var lt = /</g,
    gt = />/g,
    ap = /'/g,
    ic = /"/g;
  return value
    .toString()
    .replace(lt, "&lt;")
    .replace(gt, "&gt;")
    .replace(ap, "&#39;")
    .replace(ic, "&#34;");
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

export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
