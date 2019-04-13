const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const gulpTypescript = require('gulp-typescript');
const exec = require('child_process');
const del = require('del');

const webpackConfigDev = require('./webpack.dev');
const webpackConfigProd = require('./webpack.prod');

const typescriptProjectDb = gulpTypescript.createProject('./src/db/tsconfig.db.json');

// ビルドモジュールの削除
gulp.task('clean-dist', () => {
    return del(['./dist']);
});

// Node.jsのビルド(webpack)
gulp.task('build-server', () => {
    const webpackConfig = (process.env.NODE_ENV || 'development') === 'development' ? webpackConfigDev : webpackConfigProd;

    return webpackStream(webpackConfig, webpack)
            .pipe(gulp.dest('dist/server'));
});

// TypeORMのmigrationファイルのトランスパル
gulp.task('build-db', () => {
    return gulp.src('./src/db/**/*.ts')
            .pipe(typescriptProjectDb())
            .js
            .pipe(gulp.dest('./dist/db'));
});

// clean=>server,dbの実行
gulp.task('default',
    gulp.series(
        'clean-dist',
        gulp.parallel('build-db', 'build-server')
    )
);
