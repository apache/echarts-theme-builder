'use strict';
// generated on 2016-06-03 using generator-gulp-bootstrap 0.0.4

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');
var concat = require('gulp-concat');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.sass({
          errLogToConsole: true,
          outputStyle: 'compressed'
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/styles'))
        .pipe(reload({stream:true}))
        .pipe($.size())
        .pipe($.notify("Compilation complete."));;
});

gulp.task('scripts', function () {
    gulp.src([
        'app/scripts/components.js',
        'app/scripts/options.js',
        'app/scripts/main.js'
      ])
      .pipe(concat('app.min.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('app/scripts'))
      .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream:true, once:true}))
        .pipe($.size());
});

gulp.task('fonts', function () {
    var streamqueue = require('streamqueue');
    return streamqueue({objectMode: true},
        $.bowerFiles(),
        gulp.src('app/fonts/**/*')
    )
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['app/styles/main.css', 'app/vendors/vendors.min.js'], { read: false }).pipe($.clean());
});

gulp.task('build', ['styles', 'scripts'], function() {
    // pack vendor js files except echarts
    gulp.src([
        'app/vendors/lodash.min.js',
        'app/vendors/jquery.min.js',
        'app/vendors/bootstrap.min.js',
        'app/vendors/bootstrap-colorpicker.min.js',
        'app/vendors/vue.min.js',
        'app/vendors/FileSaver.min.js',
        'app/vendors/highlight.pack.js',
        'app/vendors/bootstrap-colorpicker.min.js',
        'app/vendors/vue.min.js',
        'app/vendors/china.js'
      ])
      .pipe(concat('vendors.min.js'))
      .pipe(gulp.dest('app/vendors'))
      .pipe($.size());
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('serve', ['styles'], function () {
    browserSync.init(null, {
        server: {
            baseDir: 'app',
            directory: true
        },
        debugInfo: false,
        open: false,
        hostnameSuffix: ""
    }, function (err, bs) {
        require('opn')(bs.options.url);
        console.log('Started connect web server on ' + bs.options.url);
    });
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));
    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['serve'], function () {

    // watch for changes
    gulp.watch(['app/*.html'], reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch([
      'app/scripts/components.js',
      'app/scripts/options.js',
      'app/scripts/main.js'
    ], ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
