/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const path = require("path");

module.exports = {
  mode: "production",
  cache: false,
  entry: {
    "AN2022_Labo0_Eq2": "./src/AN2022_Labo0_Eq2.ts",
    "AN2022_Labo1_Eq2_fb_converter": "./src/AN2022_Labo1_Eq2_fb_converter.ts",
    "AN2022_Labo1_Eq2_bf_converter": "./src/AN2022_Labo1_Eq2_bf_converter.ts",
    "AN2022_Labo1_Eq2_addition": "./src/AN2022_Labo1_Eq2_addition.ts",
    "AN2022_Labo2_Eq2": "./src/AN2022_Labo2_Eq2.ts",
    "AN2022_Labo3_SysLinEq": "./src/AN2022_Labo3_SysLinEq.ts"
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
      directory: path.join(__dirname, "docs"),
    },
    compress: true,
    port: 9000,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "docs"),
  },
};
