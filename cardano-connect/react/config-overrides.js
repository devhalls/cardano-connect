const webpack = require('webpack');

module.exports = function override(config, env) {
  const wasmExtensionRegExp = /\.wasm/;
  // Enable async web assembly
  config.experiments = {
    asyncWebAssembly: true,
    syncWebAssembly: true
  };
  // Make sure we resolve wasm files
  config.resolve.extensions.push('.wasm');
  // Fix exclude wasm from memory buffer
  config.module.rules.forEach((rule) => {
    (rule.oneOf || []).forEach((oneOf) => {
      if (oneOf.type === "asset/resource") {
        oneOf.exclude.push(wasmExtensionRegExp);
      }
    });
  });
  // Fix web buffer
  config.resolve.fallback = {
    buffer: require.resolve('buffer/'),
    stream: false
  }
  config.plugins.push(new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
  }));

  return config;
}
