const { createProxyMiddleware } = require("http-proxy-middleware");
// const ip = "192.168.43.151";
const ip = "localhost";
const port = 8080;

module.exports = function (app) {
  app.use(
    "/api/main/",
    createProxyMiddleware({
      target: `http://${ip}:${port}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/media/",
    createProxyMiddleware({
      target: `http://${ip}:${port}`,
      changeOrigin: true,
    })
  );
};
