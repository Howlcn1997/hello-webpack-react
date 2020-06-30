const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// css相关匹配规则
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const isEnvDevelopment = true;

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

const getStyleLoader = (
  cssOption = {},
  preProcessor,
  processorOptions = {}
) => {
  const loaders = [
    !isEnvDevelopment && {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "./",
        filename: "[name].css",
      },
    },
    isEnvDevelopment && "style-loader",
    {
      loader: "css-loader",
      options: cssOption,
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: preProcessor,
      options: processorOptions,
    });
  }
  return loaders;
};

module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    path: path.join(__dirname, "./build"),
    filename: "main.js",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: "foo",
          test: (m, c, entry = "foo") =>
            m.constructor.name === "CssModule" && recursiveIssuer(m) === entry,
          chunks: "all",
          enforce: true,
        },
        barStyles: {
          name: "bar",
          test: (m, c, entry = "bar") =>
            m.constructor.name === "CssModule" && recursiveIssuer(m) === entry,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoader(),
      },
      {
        test: cssModuleRegex,
        use: getStyleLoader({
          modules: {
            // 定义重新生成的类名
            localIdentName: "[name]_[local]-[hash:base64:5]",
          },
        }),
      },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoader({}, "less-loader"),
      },
      {
        test: lessModuleRegex,
        use: getStyleLoader(
          { modules: { localIdentName: "[name]_[local]-[hash:base64:5]" } },
          "less-loader"
        ),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoader({}, "sass-loader"),
      },
      {
        test: sassModuleRegex,
        use: getStyleLoader(
          { modules: { localIdentName: "[name]_[local]-[hash:base64:5]" } },
          "sass-loader"
        ),
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html", //生成的文件名
      template: path.join(__dirname, "./public/index.html"),
      minify: {
        removeComments: true, //清除注释
        collapseWhitespace: true, //清理空格
      },
    }),
  ],
};
