const common = {
    output: {
        publicPath: 'http://localhost:3000/'
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
        port: 3000,
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

module.exports = common;

