const path = require("path");

const MODE = process.env.WEBPACK_ENV;

const OUTPUT_DIR = path.join(__dirname, "src/static");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.*(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")({})]
            }
          },
          "sass-loader"
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new miniCssExtractPlugin({ filename: "styles.css" })],
  mode: MODE
};
