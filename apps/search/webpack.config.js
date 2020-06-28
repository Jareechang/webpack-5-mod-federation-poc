const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const CommonWebpack = require('@shared/common-webpack');

module.exports = CommonWebpack.overrideBase({
    output: {
        publicPath: 'http://localhost:4001/'
    },
    devServer: {
        port: 4001
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'search',
            library: { type: 'var', name: 'search' },
            filename: 'remote.js',
            remotes: {
                home: 'home',
                search: 'search'
            },
            exposes: {
                './Search': './src/Search'
            },
            shared: require('./package.json').dependencies,
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
        })
    ]
});
