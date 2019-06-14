const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./client/index.jsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public")
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
};
