const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// css相关匹配规则
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const isEnvDevelopment = true;
const isEnvProduction = !isEnvDevelopment;

const getStyleLoader = (
  cssOption = {},
  preProcessor,
  processorOptions = {}
) => {
  const loaders = [
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "./",
        filename: "[name].css",
        // ## only enable hot in development
        //  hmr: process.env.NODE_ENV === 'development',
        // ## if hmr does not work, this is a forceful method.
        //  reloadAll: true,
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
  entry: ["react-hot-loader/patch", path.join(__dirname, "./src/index.js")],
  output: {
    path: path.join(__dirname, "./build"),
    filename: "main.js",
  },
  // mode: "production",
  mode: "development",
  devServer: {
    contentBase: "./dist",
    inline: true,
    // 热更新
    hot: true,
    // 本地服务器端口号
    port: 8080,
    // 自动打开设备默认浏览器
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            // 文件小于8192kb时，直接转换成base64
            limit: 8192,
            // 输出目标路径（相对于entry）
            outputPath: "./assets",
            // 为静态资源引用地址自动添加前置路径
            publicPath: "./assets",
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
    // cleanStaleWebpackAssets: Dont remove index.html file after incremental build triggered by watch
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "./css/[name]-[hash:5].css",
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
