const { createProxyMiddleware } = require("http-proxy-middleware");
// const ip = "192.168.43.151";
const ip = "localhost";
const local = true;
const host = local ? ip : "aim-love.ga";
const port = 8080;

const url = local ? `http://${host}:${port}` : `https://${host}`;

module.exports = function (app) {
  app.use(
    "/api/main/",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/media/",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    "/api/chat/",
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
};
