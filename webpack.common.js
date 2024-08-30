const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Ensures old files are cleaned automatically
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: "asset/resource", // Uses Webpack 5's asset modules
        generator: {
          filename: "images/[name].[hash:8][ext]", // Output path for images
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: false,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
};
