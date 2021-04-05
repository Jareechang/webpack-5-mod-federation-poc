const { merge } = require('webpack-merge');
const common = require('@shared/common-webpack/config/webpack.common.js');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');

const packageJson = require('../package.json');

const websiteHost = process.env.WEBSITE_HOST;

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/common/latest/',
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'common',
      filename: 'remoteEntry.js',
      remotes: {
        app: `app@${websiteHost}/app/latest/remoteEntry.js`,
        account: `account@${websiteHost}/account/latest/remoteEntry.js`,
      },
      exposes: {
        './Nav': './src/bootstrap'
      },
      shared: packageJson.dependencies
    }),
  ]
});
