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
    sass: {                              // Task
        dist: {                            // Target
          options: {                       // Target options
            style: 'expanded',
            sourcemap: 'none'
          },
          files: {                         // Dictionary of files
            'dist/main.css': 'app/css/main.scss'       // 'destination': 'source'
          }
        }
    },
    copy: {
        files: {
            cwd: 'app',
            src: ['**/*.html', '**/*.jpg'], 
            dest: 'dist/',
            expand: true
        }
    },
    concat: {
      options: {
        separator: '\n\n'
      },
      dist: {
        src: [
            'app/**/*.js',
            '!app/test/*.js' //Exclude unit test
          ],
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
    karma: {
        unit: {
          frameworks: ['jasmine'],
          singleRun: true,
          options: {
            files: [
              'bower_components/angular/angular.js',
              'bower_components/angular-mocks/angular-mocks.js',
              'app/**/*.js',
              //'app/test/**/*.js'
            ]
          },
           browsers: ['PhantomJS']
        }
      },
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

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', ['karma'/*, 'qunit'*/]);
  grunt.registerTask('dev', ['default', 'string-replace', 'karma']);
  grunt.registerTask('default', ['jshint', 'sass', /*'qunit',*/ 'copy', 'concat', 'uglify']);


};
