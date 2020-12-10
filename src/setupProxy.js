const { createProxyMiddleware } = require("http-proxy-middleware");
// const host = "192.168.43.151";
const host = "aim-love.ga";
// const host = "localhost";
const port = 8080;

module.exports = function (app) {
  app.use(
    "/api/main/",
    createProxyMiddleware({
      target: `https://${host}`,
      // target: `http://${host}:${port}`,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/media/",
    createProxyMiddleware({
      target: `https://${host}`,
      // target: `http://${host}:${port}`,
      changeOrigin: true,
    })
  );
};
