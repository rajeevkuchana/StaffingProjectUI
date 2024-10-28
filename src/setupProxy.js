const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      //target: 'http://localhost:8090',
      target: 'http://3.81.66.16:8090',
      changeOrigin: true,
    })
  );
};