module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'string-replace': {
        dist: {
            src: 'app/index.html',
            dest: 'dist/index.html',
            options: {
                replacements: [{
                    pattern: /(.min.js)/g,
                    replacement: '.js'
                }]
            }
        }
    },
    copy: {
        files: {
            cwd: 'app',  
            src: '**/*.html',
            dest: 'dist/',
            expand: true
        }
    },
    concat: {
      options: {
        separator: '\n\n'
      },
      dist: {
        src: ['app/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      //options: {
      //    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      //},
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    //qunit: {
      //files: ['test/**/*.html']
    //},
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'/*, 'qunit'*/]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('test', ['jshint'/*, 'qunit'*/]);
  grunt.registerTask('dev', ['default', 'string-replace']);
  grunt.registerTask('default', ['jshint', /*'qunit',*/ 'copy', 'concat', 'uglify']);
  

};