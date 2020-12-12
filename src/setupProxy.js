const { createProxyMiddleware } = require("http-proxy-middleware");
const local = true;
const host = local ? "localhost" : "aim-love.ga";
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
};
