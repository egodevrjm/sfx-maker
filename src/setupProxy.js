const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy ElevenLabs API requests
  app.use(
    '/api/elevenlabs',
    createProxyMiddleware({
      target: 'https://api.elevenlabs.io',
      changeOrigin: true,
      pathRewrite: {
        '^/api/elevenlabs': '', // Remove the '/api/elevenlabs' path
      },
    })
  );

  // Proxy Gemini API requests
  app.use(
    '/api/gemini',
    createProxyMiddleware({
      target: 'https://generativelanguage.googleapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/gemini': '', // Remove the '/api/gemini' path
      },
    })
  );
};
