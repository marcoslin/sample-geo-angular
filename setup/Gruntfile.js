// Gruntfile
/*jslint devel: true, node: true, white:true */

path = require("path");

module.exports = function (grunt) {
	'use strict';
    require('load-grunt-tasks')(grunt);

	/**
	 * Define Configuration Variables.
	 * Note: cwd is "./setup" so the `setup` variable defined below is only to be used
	 *       when cwd has been changed to `app` and grunt needs to reference "./setup"
	 */
	var configVars = {
        "www": "../www",
        "dist_www": "../../gh-pages",
		"hostname": "localhost",
		"port": 8080
	};

    function getJSFiles(useMinVersion) {
		var file_ext = ".js";
		
		if (useMinVersion) { file_ext = ".min.js"; }
		
		var file_list = [
			"angular/angular" + file_ext,
			"angular-route/angular-route" + file_ext
		];
		
		return file_list;
    }
    
    // Grunt Config
    grunt.initConfig({
		cvars: configVars,
		bower: {
			setup: {
				options: { install: true, copy: false }
			}
		},
		copy: {
			setup: {
				files: [
					// Javascript with standard .min.js naming convention
					{
						cwd: "bower_components", expand: true, flatten: true,
						dest: "<%= cvars.www %>/js/ext/",
						src: getJSFiles()
					}
				]
			}
		},
        sync: {
            deploy: {
                files: [
                    {
                        cwd: '<%= cvars.www %>', dest: '<%= cvars.dist_www %>/',
                        src: ['style/**', 'images/**', 'js/**', 'views/**']
                    }
                ]
            }
		},
        preprocess: {
            html: {
                src : '<%= cvars.www %>/index.html',
                dest : '<%= cvars.dist_www %>/index.html'
            },
        },
        watch: {
			www: {
				files: ["<%= cvars.www %>/**/*"],
				tasks: [],
				options: {
					spawn: false,
					livereload: true
				}
			}
		},
        connect: {
            server: {
                livereload: true,
                options: {
                    port: configVars.port,
                    base: "<%= cvars.www %>"
                }
            }
        }
    });

    
	/**
	 * setup task
	 * Run the initial setup, sourcing all needed upstream dependencies
	 */
	grunt.registerTask('setup', ['bower:setup', 'copy:setup']);

    
	/**
	 * devel task
	 * Launch gae server as early as possible so that it has time to start
	 */
	grunt.registerTask('devel', [
        'connect:server', 'watch:www'
	]);
	
	/**
	 * deploy task
	 * Deploy to Google App Engine
	 */
	grunt.registerTask('deploy', [
        'sync:deploy', 'preprocess:html'
	]);
	
	
};