/* eslint-disable */
const path = require("path");
// const devServer = require('webpack-dev-server')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  rules:[{
    test:/\.scss$/,
    use:[
      {loader:'css-loader'},
      {loader:'resolve-url-loader'},
      {loader:'sass-loader',
        options:{
          sourceMap:true,
          sourceMapContents:false
        }  
    }
    ]
  }]
};
