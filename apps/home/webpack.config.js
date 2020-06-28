const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CommonWebpack = require('@shared/common-webpack');

module.exports = CommonWebpack.overrideBase({
    output: {
        publicPath: 'http://localhost:4000/'
    },
    devServer: {
        port: 4000,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'home',
            library: { type: 'var', name: 'home' },
            filename: 'remote.js',
            remotes: {
                home: 'home',
                search: 'search'
            },
            exposes: {
                './Home': './src/Home',
                './AppContainer': './src/AppContainer'
            },
            shared: require('./package.json').dependencies,
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
        })
    ]
})
