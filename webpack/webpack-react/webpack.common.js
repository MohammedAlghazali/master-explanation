const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  // modules loaders
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        // order is important in this array // it's work reversely start with css-loader and then style-loader
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // here you can apply plugins that will work on the bundle file in general before bundle it, while the modules work per file, so this is the difference between them
  plugins: [],
};
