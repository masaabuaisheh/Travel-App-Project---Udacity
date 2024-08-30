const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
              name: "images/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Client",
    clean: true,
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    minimize: true,
  },
});
