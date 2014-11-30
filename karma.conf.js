// Karma configuration
module.exports = function(config) {

    'use strict';

    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: './',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // vendors
            'bower_components/angular/angular.min.js',
            // vendor helpers
            'bower_components/angular-mocks/angular-mocks.js',

            // app
            'src/**/*.js',

            // test specs
            'spec/*Spec.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        preprocessors: {
            'src/scripts/*.js': 'coverage',
        },
        coverageReporter: {
            dir : 'coverage/',
            reporters: [
                { type: 'text' },
                { type: 'html', subdir: 'html' },
                { type: 'lcov', subdir: 'lcov' },
            ]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['dots', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 10000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false

    });
};