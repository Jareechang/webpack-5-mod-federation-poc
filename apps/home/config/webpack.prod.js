const { merge } = require('webpack-merge');
const common = require('@shared/common-webpack/config/webpack.common.js');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const packageJson = require('../package.json');

const websiteHost = process.env.WEBSITE_HOST;

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/app/latest/',
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app',
      filename: 'remoteEntry.js',
      exposes: {
        // Global shared utility
        './SharedGlobals' : './src/global'
      },
      remotes: {
        app: `app@${websiteHost}/app/latest/remoteEntry.js`,
        common: `common@${websiteHost}/common/latest/remoteEntry.js`,
        search: `search@${websiteHost}/search/latest/remoteEntry.js`,
        account: `account@${websiteHost}/account/latest/remoteEntry.js`
      },
      shared: [
        {
          ...packageJson.dependencies,
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies.react
          },
          'react-dom': {
            singleton: true,
            requiredVersion: packageJson.dependencies['react-dom']
          }
        },
        './src/global'
      ]
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
})
