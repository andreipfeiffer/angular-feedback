module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        jshint: {
            files: [
                'Gruntfile.js',
                'src/scripts/**/*.js',
                'demo/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            dist: ['dist']
        },

        cssmin: {
            build: {
                files: {
                    'dist/ng-notify.min.css': 'src/styles/ng-notify.css'
                }
            },

            demo: {
                files: {
                    '_gh-pages/demo.min.css': [
                        'src/styles/ng-notify.css',
                        'demo/demo.css'
                    ]
                }
            }
        },

        processhtml: {
            build: {
                files: {
                    '_gh-pages/index.html': 'demo/index.html'
                }
            }
        },

        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            index: {
                files: {
                    '_gh-pages/index.html': '_gh-pages/index.html'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'dist/ng-notify.min.js': 'src/**/*.js'
                }
            },
            demo: {
                files: {
                    '_gh-pages/demo.min.js': [
                        'bower_components/angular/angular.js',
                        'src/scripts/ng-notify.js',
                        'demo/demo.js'
                    ]
                }
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*', 'demo/**/*'],
                tasks: ['build']
            }
        }

    });

    /* Build process...

    - Lint JS
    - Clean old build
    - Process styles 
    - Process scripts 
    - Process demo */

    grunt.registerTask('build', [
        'jshint',
        'clean', 
        'cssmin:build',
        'uglify:build',
        'demo'
    ]);

    grunt.registerTask('demo', [
        'processhtml', 
        'htmlmin',
        'cssmin:demo',
        'uglify:demo'
    ]);


    grunt.registerTask('default', ['build']);
    grunt.registerTask('dev', ['build', 'watch']);

};
