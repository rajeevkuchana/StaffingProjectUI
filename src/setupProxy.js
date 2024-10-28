const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      //target: 'http://localhost:8090',
      target: 'http://18.232.90.66:8090',
      changeOrigin: true,
    })
  );
};