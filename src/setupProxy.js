const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://suitmedia-backend.suitdev.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": "/api",
      },
      onProxyReq: function (proxyReq, req, res) {
        // Add any custom headers if needed
        proxyReq.setHeader("Accept", "application/json");
      },
      onProxyRes: function (proxyRes, req, res) {
        // Log response headers for debugging
        console.log("Proxy response status:", proxyRes.statusCode);

        // Handle CORS headers
        proxyRes.headers["Access-Control-Allow-Origin"] = "*";
        proxyRes.headers["Access-Control-Allow-Methods"] =
          "GET, POST, PUT, DELETE, OPTIONS";
        proxyRes.headers["Access-Control-Allow-Headers"] =
          "Origin, X-Requested-With, Content-Type, Accept";
      },
      // Log errors
      onError: function (err, req, res) {
        console.error("Proxy error:", err);
      },
    })
  );
};
