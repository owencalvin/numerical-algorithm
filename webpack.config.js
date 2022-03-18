/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    labo0: "./src/labo0.ts",
    "labo1-fb-converter": "./src/labo1-fb-converter.ts",
    "labo1-bf-converter": "./src/labo1-bf-converter.ts",
    "labo1-addition": "./src/labo1-addition.ts"
  },
  devtool: "inline-source-map",
  optimization: {
    minimize: false
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
