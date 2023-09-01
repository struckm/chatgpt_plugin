const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3333;

// Define your proxy route
const proxyOptions = {
  target: 'http://localhost:3000', // Change this to your API's address and port
  changeOrigin: true, // Necessary for your local API
};

const apiProxy = createProxyMiddleware('/', proxyOptions);

// Use the proxy for all routes under '/'
app.use('/', apiProxy);

// Start your Express server
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
