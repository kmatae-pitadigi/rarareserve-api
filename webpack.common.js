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
                exclude: /(node_modules|client)/
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
                exclude: /(node_modules|client)/
            },
            {
                test: /\.txt$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                        publicPath: function(path) {
                            return '../' + path;
                        }
                    }
                },
                exclude: /(node_modules|client)/
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.js',
            '.txt'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/server')
    }
};
