const BaseWebpackConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8080/'
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.tsx',
            '.ts',
            '.json'
        ]
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                 test: /\.tsx?$/,
                 exclude: /node_modules/,
                 use: {
                     loader: 'babel-loader',
                     options: {
                         presets: [
                             '@babel/preset-react',
                             '@babel/preset-env',
                             '@babel/preset-typescript',
                         ],
                         plugins: [
                             '@babel/plugin-transform-runtime'
                         ]
                     }
                 }
             }
        ]
    },
    plugins: []
};


/**
 *
 * Provide an utility function to re-use common app build configure while leaving options to override
 * micro front-end configurations
 *
 *
 * */
function overrideBase(options) {
    const commonWebpackConfig = {...BaseWebpackConfig};
    /**
     *
     *  Allow override module federation module options 
     *
     * */
    commonWebpackConfig.output.publicPath = options.output.publicPath;
    commonWebpackConfig.devServer.port = options.devServer.port;
    commonWebpackConfig.plugins = options.plugins;
    return commonWebpackConfig;
}

module.exports = {
    overrideBase 
};
