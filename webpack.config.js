const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = () => {
  /* 
    Since dotenv requires an environment for variable storage, it only works out of the box 
    server-side. Thus, we'll need to turn out module.exports = {} into a function and
    grab the contents of the .env file, turn it into an object, and pass it to Webpack's
    DefinePlugin so that we can access the variables in the app under 
    "process.env".

    Solution from Stack Overflow: 
    https://stackoverflow.com/questions/54169021/cant-access-variable-key-inside-env-dotenv-package-react
  */
  const env = dotenv.config().parsed;
  const envVars = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    // Below line fixes this known issue: https://github.com/motdotla/dotenv/issues/233
    node: {
      fs: "empty"
    },
    plugins: [
      // Using DefinePlugin to access dotenv variables
      new webpack.DefinePlugin(envVars),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        filename: "./index.html"
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          },
          resolve: {
            extensions: ['.js', '.jsx'],
          },
        },
        {
          test: /\.html$/,
          use: {
            loader: "html-loader"
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        // This line requires installing file-loader
        // which allows us to import file-based assets
        // into webpack, managed by JS and CSS files.
        {
          test: /\.(woff(2)?|ttf|eot|svg|gif|png)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    }
  }
};

