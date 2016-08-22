module.exports = function (grunt) {
  var app = grunt.option('app');
  console.log("Running app:" + app);

  grunt.initConfig({
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static('app' + app)
            ];
          }
        }
      }
    },
    watch: {
      project: {
        files: ['app' + app + '/**/*.js',
                'app' + app + '/**/*.html',
                'app' + app + '/**/*.json',
                'app' + app + '/**/*.css'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect', 'watch']);

};
