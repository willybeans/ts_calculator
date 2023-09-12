/* tslint:disable */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  // watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/assets/",
  },
  devServer: {
    headers: {
      "Cache-Control": "no-store",
    },
    compress: false,
    static: false,
    client: {
      logging: "warn",
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
    },
    port: 1234,
    host: "0.0.0.0",
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/assets", to: "assets/" }],
    }),
    new HtmlWebpackPlugin({
      template: "dist/index.html",
    }),
  ],
};
