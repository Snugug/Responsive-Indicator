(function () {
  'use strict';

  module.exports = function (grunt) {

    grunt.initConfig({
      watch: {
        js: {
          files: ['build/{,**/}*.js'],
          tasks: ['jshint']
        }
      },

      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: ['build/{,**/}*.js']
      },

      uglify: {
        dist: {
          options: {
            mangle: true,
            compress: true
          },
          files: [{
            expand: true,
            cwd: 'build',
            src: ['**/*.js'],
            dest: 'dist',
            ext: '.min.js'
          }]
        }
      },

      //////////////////////////////
      // Compress
      //////////////////////////////
      compress: {
        dist: {
          options: {
            mode: 'gzip'
          },
          files: [{
            expand: true,
            cwd: 'dist',
            src: ['**/*.min.js'],
            dest: 'dist',
            ext: '.gz.js'
          }]
        }
      },

      bump: {
        options: {
          files: [
            'package.json',
            'bower.json'
          ],
          commit: true,
          commitMessage: 'Release v%VERSION%',
          commitFiles: ['-a'],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          push: true,
          pushTo: 'origin'
        }
      }
    });

    //////////////////////////////
    // Grunt Task Loads
    //////////////////////////////
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //////////////////////////////
    // Build
    //////////////////////////////
    grunt.registerTask('build', 'Builds distribution code', function() {
      grunt.task.run('jshint', 'uglify', 'compress');
    });
  };
}());