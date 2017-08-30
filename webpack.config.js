const webpack = require('webpack');
module.exports = (envOptions) => {
    envOptions = envOptions || {};
    const config = {
        entry: {
            "vendor": "./app/vendor",
            "app": "./app/main"
        },
        output: {
            path: __dirname,
            filename: "./dist/[name].bundle.js"
        },
        resolve: {
            extensions: ['.ts', '.js', '.html'],
        },
        module: {
            rules: [
                { test: /\.html$/, loader: 'raw-loader' },
                { test: /\.css$/, loader: 'raw-loader' },
                { test: /\.ts/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] }
            ]
        },
        devtool: '#source-map',
    };
    if (envOptions.MODE === 'prod') {
        config.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    warnings: false,
                    screw_ie8: true
                },
                comments: false
            }),
        ];
    }
    return config;
};