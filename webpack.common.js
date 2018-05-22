"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/main.ts",
  output: {
    globalObject: "this",
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs"),
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  module: {
    strictExportPresence: true,
    strictThisContextOnImports: false,
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(__dirname, "node_modules", ".cache", "cache-loader"),
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
      },
    ],
  },
};
