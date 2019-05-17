const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const glob = require('glob');

module.exports = merge(common, {
    entry: {
        server: [
            'webpack/hot/poll',
            './src/server/main.ts'
        ],
        text: glob.sync('./src/server/assets/text/**/*'),
        image: glob.sync('./src/server/assets/image/**/*')
    },
    mode: 'development',
    devtool: 'source-map',
    watch: true,
    externals: [
        nodeExternals({
            whitelist: [
                'webpack/hot/poll'
            ]
        })
    ], 
    plugins: [
        new BundleAnalyzerPlugin({
                openAnalyzer: false,
                generateStatsFile: true,
                analyzerMode: 'static',
                reportFilename: '../../report.html',
                statsFilename: '../../stats.json'
            }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
        new webpack.HotModuleReplacementPlugin()
    ]
})
