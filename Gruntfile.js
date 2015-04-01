// jscs:disable

var fs = require('fs');

module.exports = function(grunt) {

  grunt.initConfig({

    babel: {
      dist: {
        files: (function() {
          var files = {
            'wulu/index.js': 'wulu/src/index.js'
          };

          var rootDir = fs.readdirSync('wulu/src');
          var cmdDir = fs.readdirSync('wulu/src/commands');

          rootDir.forEach(function(f) {
            if (f.indexOf('.js') < 0 || f === 'index.js') return;
            files['wulu/build/' + f] = 'wulu/src/' + f;
          });

          cmdDir.forEach(function(f) {
            if (f.indexOf('.js') < 0) return;
            files['wulu/build/commands/' + f] = 'wulu/src/commands/' + f;
          });

          return files;
        })()
      }
    },

    watch: {
      babel: {
        files: 'wulu/src/**/*.js',
        tasks: ['babel']
      }
    }

  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('es6', ['babel']);

  grunt.registerTask('default', ['babel', 'watch']);

};
