module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

     sass:{
      dist:{
        options:{
          style: 'expanded',
          sourcemap: 'true'
        },
        files:{
          'style.css': 'style.scss'
        },
      },
    },
    jade:{
      compile:{
        options:{
          pretty: true
        },
        files: {
          "raw.html" : "templates/*.jade"
        }
      },
      ugly:{
        options:{
          pretty:false
        },
        files: {
          "raw.html" : "templates/*.jade"
        }
      }
    },
    premailer: {
      withqs: {
        options: {
          css: 'style.css'
        },
        files: {
          'index.html': ['raw.html']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-mustache-render');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-premailer');

  grunt.registerTask('default', ['sass','jade:compile','premailer']);
  grunt.registerTask('build', ['sass','jade:ugly']);
  // grunt.registerTask('mustache', ['mustache_render']);
  // grunt.registerTask('countdown', ['mustache_render:countdown']);
  // grunt.registerTask('favorites', ['mustache_render:favorites']);

};