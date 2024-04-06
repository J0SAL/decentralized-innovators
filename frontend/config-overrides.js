const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};

  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    vm: require.resolve("vm-browserify"),
    process: require.resolve("process"),
  });

  config.resolve.fallback = fallback;

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  config.resolve.alias = {
    ...config.resolve.alias,
    "snarkjs/build/browser.esm.js": "snarkjs/build/browser.esm.js",
  };

  return config;
};
