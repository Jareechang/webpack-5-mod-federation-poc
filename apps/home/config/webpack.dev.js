const { merge } = require('webpack-merge');
const common = require('@shared/common-webpack/config/webpack.common.js');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');


const packageJson = require('../package.json');

const PORT = 4000;

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
      name: 'app',
      filename: 'remoteEntry.js',
      exposes: {
        // Global shared utility
        './SharedGlobals' : './src/global'
      },
      remotes: {
        app: 'app@http://localhost:4000/remoteEntry.js',
        search: 'search@http://localhost:4001/remoteEntry.js',
        searchResults: 'searchResults@http://localhost:4002/remoteEntry.js',
        account: 'account@http://localhost:4003/remoteEntry.js'
      },
      shared: [
        {
          ...packageJson.dependencies,
          react: {
            singleton: true,
            requiredVersion: packageJson.dependencies.react
          },
        },
        './src/global'
      ]
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    })
  ]
})
