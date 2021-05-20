const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    compress: true,
    open: true,
    hot: true,
    port: 9000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "blocking",
      inject: "head",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
