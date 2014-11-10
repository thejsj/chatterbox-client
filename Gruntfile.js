module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // CSS & Sass
    sass: {
      dist: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          './client/styles/style.css': './client/styles/styles.scss'
        }
      }
    },
    watch: {
      // grunt: {
      //   files: ['Gruntfile.js']
      // },
      sass: {
        files: 'client/styles/**/*.scss',
        tasks: ['sass']
      },
      options: {
        livereload: true,
      },
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['sass']);
};
