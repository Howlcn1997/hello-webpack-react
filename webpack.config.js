const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// css相关匹配规则
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const isEnvDevelopment = false;

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
  // mode: "production",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    inline: true,
    hot: true,
    open: true,
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
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
          },
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
  resolve: {
    // 设置别名
    alias: {
      "@components": path.join(__dirname, "./src/components"), // 这样配置后 @ 可以指向 src 目录
    },
  },
};
