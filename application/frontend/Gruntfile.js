// Generated on 2015-03-20 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    appConfig: appConfig,

    ngconstant: {
        // Options for all targets
        options: {
          space: '  ',
          wrap: '"use strict";\n\n {%= __ngModule %}',
          name: 'config'
        },
        // Environment targets
        dev: {
          options: {
            dest: '<%= appConfig.app %>/assets/scripts/config.js'
          },
          constants: {
            ENV: {
              BACKEND_API: 'http://localhost:3000',
              FDA_API: 'https://api.fda.gov',
              RXNORM_API: 'http://rxnav.nlm.nih.gov/REST',
            }
          }
        },
        dist: {
          options: {
            dest: '<%= appConfig.app %>/assets/scripts/config.js'
          },
          constants: {
            ENV: {
              BACKEND_API: 'http://tesla-api.devopsplatform.com',
              FDA_API: 'https://api.fda.gov',
              RXNORM_API: 'http://rxnav.nlm.nih.gov/REST',
            }
          }
        },
        test: {
          options: {
            dest: '<%= appConfig.app %>/assets/scripts/config.js'
          },
          constants: {
            ENV: {
              BACKEND_API: 'http://localhost:3000',
              FDA_API: 'https://api.fda.gov',
              RXNORM_API: 'http://rxnav.nlm.nih.gov/REST',
            }
          }
        }
    },
    // Watches files for changes and runs tasks based on the changed files
        watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: [
            '<%= appConfig.app %>/assets/scripts/{,*/}/{,*/}*.js', 
            '<%= appConfig.app %>/{,*/}/{,*/}*.js', 
            '<%= appConfig.app %>/{,*/}*.js', 
            '<%= appConfig.app %>/*.js'
        ],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= appConfig.app %>/assets/styles/*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= appConfig.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= appConfig.app %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      includeSource: {
        files: ['<%= appConfig.app %>/index.html'],
        tasks: ['includeSource:server']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
                function(req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.setHeader('Access-Control-Allow-Methods', '*');
                    next();
                },
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/assets/styles',
                connect.static('./app/assets/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= appConfig.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= appConfig.app %>/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appConfig.dist %>/{,*/}*',
            '!<%= appConfig.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= appConfig.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= appConfig.dist %>/assets/{,*/}*.js',
          '<%= appConfig.dist %>/assets/styles/{,*/}*.css',
          '<%= appConfig.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= appConfig.dist %>/assets/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '.tmp/index.html', //important to read from .tmp after include-source add js/css
      options: {
        dest: '<%= appConfig.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= appConfig.dist %>/{,*/}*.html'],
      css: ['<%= appConfig.dist %>/assets/styles/*.css'],
      js: ['<%= appConfig.dist %>/assets/scripts/*.js'],
      options: {
        assetsDirs: [
          '<%= appConfig.dist %>/',
          '<%= appConfig.dist %>/assets',
          '<%= appConfig.dist %>/assets/images',
          '<%= appConfig.dist %>/assets/styles'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
     cssmin: {
       dist: {
         files: {
           '<%= appConfig.dist %>/assets/styles/main.css': [
             '.tmp/styles/{,*/}*.css'
           ]
         }
       }
     },
     uglify: {
       dist: {
         files: {
           '<%= appConfig.dist %>/assets/scripts/scripts.js': [
             //'<%= appConfig.dist %>/scripts/scripts.js'
             '<%= appConfig.app %>/assets/scripts/components/version/*.js',
             '<%= appConfig.app %>/{,*/}/{,*/}*.js',
             '<%= appConfig.app %>/*.js'
           ]
         }
       }
     },
     concat: {
       dist: {}
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          //cwd: '<%= appConfig.app %>/images',
          cwd: '<%= appConfig.app %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= appConfig.dist %>/assets/images'
          //dest: '<%= appConfig.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          //cwd: '<%= appConfig.app %>/images',
          cwd: '<%= appConfig.app %>/assets/images',
          src: '{,*/}*.svg',
          //dest: '<%= appConfig.dist %>/images'
          dest: '<%= appConfig.dist %>/assets/images'
        },
        {
          expand: true,
          //cwd: '<%= appConfig.app %>/images',
          cwd: '<%= appConfig.app %>/assets/svg',
          src: '{,*/}*.svg',
          //dest: '<%= appConfig.dist %>/images'
          dest: '<%= appConfig.dist %>/assets/svg'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= appConfig.dist %>',
          //src: ['*.html', 'views/{,*/}*.html'],
          src: ['*.html', '{,*/}/views/{,*/}*.html'],
          dest: '<%= appConfig.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= appConfig.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appConfig.app %>',
          dest: '<%= appConfig.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            //'*.html',
            '{,*/}views/{,*/}*.html',
            'assets/images/{,*/}*.{webp}',
            'assets/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= appConfig.dist %>/images',
          src: ['generated/*']
        }
        ,{
          expand: true,
          cwd: 'bower_components/font-awesome',
          src: 'fonts/*',
          dest: '<%= appConfig.dist %>/assets'
        }
       ]
      },
      styles: {
        expand: true,
        cwd: '<%= appConfig.app %>/assets/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    //Include dynamically JS/CSS into index.html page
    includeSource: {
      options: {
        // Task-specific options go here. 
        basePath: 'app',
        baseUrl: '/',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
          },    
        },
      },
      server: {
        files: {
          '.tmp/index.html': '<%= appConfig.app %>/index.html'
        }
      },
      dist: {
        // Target-specific file lists and/or options go here. 
        files: {
          '<%= appConfig.dist %>/index.html': '.tmp/index.html' //important to write index.html into .tmp after include-source add js/css
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'ngconstant:dev',
      'clean:server',
      'wiredep',
      'includeSource:server',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'ngconstant:test',
    'clean:server',
    'wiredep',
    'includeSource:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'ngconstant:dist',
    'clean:dist',
    'wiredep',
    'includeSource:server', //important to make index.html ready in .tmp with js/css included through include-source
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'includeSource:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
