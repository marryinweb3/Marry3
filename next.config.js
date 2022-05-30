// const { locales, sourceLocale } = require("./lingui.config.js");
const withLess = require("next-with-less");
const withImages = require("next-images");
module.exports = withLess({
  fileExtensions: ["jpg", "jpeg", "png", "gif"],
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#F41870",
        "@link-color": "#1DA57A",
        "@border-radius-base": "7px",
        "@border-color-base": "#EBEBEB",
        "@border-width-base": "2px",
      },
    },
  },
  webpack: (config) => {
    return config;
  },
  async rewrites() {
    return [];
  },
});
