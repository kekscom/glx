
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\n',
        banner: '',
        footer: ''
      },
      dist: {
        src: grunt.file.readJSON('config.json').src,
        dest:  'dist/<%=pkg.name%>.debug.js'
      }
    },

    uglify: {
      options: {},
      build: {
        src: 'dist/<%=pkg.name%>.debug.js',
        dest: 'dist/<%=pkg.name%>.js'
      }
    },

    clean: {
      dist: ['./dist/<%=pkg.name%>.pack.js']
    },

    jshint: {
      options: {
         globals: {
           Map: true
         }
       },
      all: 'dist/<%=pkg.name%>.debug.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', 'Development build', function() {
    grunt.log.writeln('\033[1;36m'+ grunt.template.date(new Date(), 'yyyy-mm-dd HH:MM:ss') +'\033[0m');
    grunt.task.run('concat');
    grunt.task.run('uglify');
  });

  grunt.registerTask('release', 'Release', function() {
    grunt.log.writeln('\033[1;36m'+ grunt.template.date(new Date(), 'yyyy-mm-dd HH:MM:ss') +'\033[0m');
    grunt.task.run('jshint');
    grunt.task.run('default');
  });
};
