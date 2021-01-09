const { createProxyMiddleware } = require("http-proxy-middleware");
// const ip = "192.168.43.151";
const ip = "localhost";
const dev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
const host = dev ? ip : process.env.PROJECT_HOST;
const port = 8080;

const url = dev ? `http://${host}:${port}` : `https://${host}`;

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
