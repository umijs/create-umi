// ref:
// - https://umijs.org/plugin/develop.html

module.exports = function (api, options) {

  // Example: output the webpack config
  api.chainWebpackConfig(config => {
    console.log(config.toString());
  });
}
