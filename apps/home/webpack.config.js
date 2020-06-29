const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CommonWebpack = require('@shared/common-webpack');

module.exports = CommonWebpack.overrideBase({
    mode: 'development',
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
                './Content': './src/Content',
                './AppContainer': './src/AppContainer',
                './Nav': './src/Nav'
            },
            shared: [
                "react",
                "react-dom",
                "material-ui/core",
                "material-ui/icons"
            ]
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
        })
    ]
})
