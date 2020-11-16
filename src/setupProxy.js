const { createProxyMiddleware } = require("http-proxy-middleware");
// const host = "192.168.43.151";
const host = "localhost";
const port = 8080;

module.exports = function (app) {
  app.use(
    "/api/main/",
    createProxyMiddleware({
      target: `http://${host}:${port}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/media/",
    createProxyMiddleware({
      target: `http://${host}:${port}`,
      changeOrigin: true,
    })
  );
};
