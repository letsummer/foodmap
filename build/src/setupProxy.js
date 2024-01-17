import { createProxyMiddleware } from "http-proxy-middleware";
module.exports = function (app) {
  app.use('/api', createProxyMiddleware({
    target: "https://foodmap-xvdq.onrender.com",
    pathRewrite: {
      '^/api': ''
    }
  }));
};