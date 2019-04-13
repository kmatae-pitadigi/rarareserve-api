const merge = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
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
