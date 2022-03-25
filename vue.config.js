const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessors: "scss",
      patterns: [],
    },
  },
  chainWebpack: (config) => {
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/svgIcon/svg")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/svgIcon/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
