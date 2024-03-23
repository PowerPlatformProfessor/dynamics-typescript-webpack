var path = require("path");
const webpack = require("webpack");
var fs = require("fs");

module.exports = [
  {
    entry: getEntryObjectForm(),

    output: {
      filename: "./[name].js",

      libraryTarget: "var",

      library: {
        name: "[name]",
        type: "assign-properties",
      },

      path: path.resolve(__dirname, "dist"),

      clean: true,

      globalObject: "this",
    },

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".scss", ".css"],

      modules: ["node_modules", path.resolve(__dirname, "./node_modules")],
    },

    devtool: "inline-source-map",

    module: {
      rules: [
        {
          test: /\.ts(x)?$/,

          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "ts-loader",
            },
          ],
        },
        {
          test: /\.js$/,

          use: "source-map-loader",

          enforce: "pre",
        },
      ],
    },

    optimization: {
      minimize: false,
      splitChunks: {
        chunks: "async",
        minSize: 1,
        cacheGroups: {
          default: {
            reuseExistingChunk: true,
          },
        },
      },
    },

    plugins: [new webpack.optimize.AggressiveMergingPlugin()],
  },
];

function getEntryObjectForm() {
  var entries = fs.readdirSync("./src/scripts").filter((file) => {
    return file.match(/.*\.ts$/);
  });

  var obj = {};

  entries.forEach((e) => {
    obj[e.split(".ts")[0]] = ["babel-polyfill", `./src/scripts/${e}`];
  });

  return obj;
}
