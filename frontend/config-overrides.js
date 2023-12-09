const cryptoFallback = require.resolve("crypto-browserify");
const streamFallback = require.resolve("stream-browserify");

module.exports = function override(config, env) {
  // Add the crypto fallback to resolve.fallback
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: cryptoFallback,
    stream: streamFallback,
  };

  return config;
};
