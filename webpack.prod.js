"use strict";

const webpack = require("webpack");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(require("./webpack.common"), {
  mode: "production",
  devtool: "hidden-source-map",
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          cache: true,
          parallel: true,
          sourceMap: true,
          uglifyOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              inline: true,
              reduce_funcs: false,
              passes: 3,
            },
            output: {
              ecma: 5,
              comments: false,
            },
            toplevel: true,
            mangle: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "DEBUG": "false",
      "TARGET": JSON.stringify("browser"),
    }),
    new CopyWebpackPlugin([
      { from: "public/", to: "" },
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      template: "html/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
});
