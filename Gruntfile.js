var fs = require('fs');

module.exports = function(grunt) {

  grunt.initConfig({

    babel: {
      dist: {
        files: (function() {
          var files = {};

          var dir = fs.readdirSync('helloworld2/src');

          dir.forEach(function(file) {
            files['helloworld2/build/' + file] = 'helloworld2/src/' + file;
          });

          return files;
        })()
      }
    },

    watch: {
      babel: {
        files: 'helloworld2/src/**/*.js',
        tasks: ['babel']
      }
    }

  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('es6', ['babel']);

  grunt.registerTask('default', ['babel', 'watch']);

};
