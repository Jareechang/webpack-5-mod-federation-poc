const { merge } = require('webpack-merge');
const common = require('@shared/common-webpack/config/webpack.common.js');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const packageJson = require('../package.json');

const PORT = 4001;

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: `http://localhost:${PORT}/`
  },
  devServer: {
    port: PORT,
    historyApiFallback: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'common',
      filename: 'remoteEntry.js',
      remotes: {
        app: 'app@http://localhost:4000/remoteEntry.js',
        account: 'account@http://localhost:4003/remoteEntry.js',
      },
      exposes: {
        './Nav': './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
});
