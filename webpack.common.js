const path = require('path');

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            typeCheck: false,
                            // tslint時に自動的に修正しない
                            fix: false,
                            // warningをエラーにすることでその後のビルドを止める
                            emitErrors: true
                        },
                    },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'src/server/tsconfig.server.json'
                        }
                    },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.txt$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/text/',
                        publicPath: function(path) {
                            return '../' + path;
                        }
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/image/',
                        publicPath: function(path) {
                            return '../' + path;
                        }
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.js',
            '.txt',
            '.jpg'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/server')
    }
};
