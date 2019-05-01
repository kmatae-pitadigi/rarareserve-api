const merge = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
    mode: 'production',
    entry: {
        server: './src/server/main.ts',
        assets: glob.sync('./src/server/assets/**/*')
    },
    externals: [
        nodeExternals()
    ], 
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    drop_console: true
                }
            })
        ]
    }
})
