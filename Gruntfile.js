var fs = require('fs');

module.exports = function(grunt) {

  grunt.initConfig({

    babel: {
      dist: {
        files: (function() {
          var files = {};

          var dir = fs.readdirSync('wulu/src');

          dir.forEach(function(file) {
            files['wulu/build/' + file] = 'wulu/src/' + file;
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
