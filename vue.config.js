const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/vue3-tehnozavr-dist/' : '/',
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve('util/'),
        path: require.resolve('path-browserify'),
        url: require.resolve('url/'),
        assert: require.resolve('assert/'),
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify'),
        fs: false,
        dgram: false,
        net: false,
        tls: false,
        child_process: false,
        module: false,
      },
    },
  },
});
