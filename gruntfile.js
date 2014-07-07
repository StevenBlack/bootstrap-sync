/* jshint node: true */

module.exports = function( grunt ) {
	'use strict';

	var _        = require('lodash');
	var pkg      = grunt.file.readJSON( 'package.json' );
	var options  = grunt.file.exists( 'options.json' ) ? grunt.file.readJSON( 'options.json' ) : {} ;
	var settings = _.merge( {}, pkg.defaults, options );

	// Project configuration.
	grunt.initConfig({

		// Metadata.
		pkg: pkg,
		options: options,
		settings: settings,

		jqueryCheck: 'if (typeof jQuery === \'undefined\') { throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\') }\n\n' ,

		clean: {
			'bootstrap-source': [ '<%= settings.location.bootstrap.local %>/' ],
			'bootstrap-fonts': [ 'settings.location.deploy.fonts %>/' ],
			'css': [ '<%= settings.location.deploy.css %>/', "!<%= settings.location.deploy.css %>/main.css" ],
			'js': [ '<%= settings.location.deploy.js %>/' ]
		},

		copy: {
			'bootstrap-source': {
				nonull: true,
				expand: true,
				cwd: '<%= settings.location.bootstrap.authoritative %>/',
				src: [ '<%= settings.location.deploy.fonts %>/*', '<%= settings.location.deploy.js %>/*', 'less/**' ],
				dest: '<%= settings.location.bootstrap.local %>/',
			},
			'bootstrap-tweaks': {
				src: [ 'less/*' ],
				dest: '<%= settings.location.bootstrap.local %>/',
			},
			'stage-fonts': {
				'bootstrap': {
					expand: true,
					flatten: true,
					src: [ '<%= settings.location.bootstrap.local %>/fonts/*' ],
					dest: '<%= settings.location.deploy.fonts %>/'
				},

				'fontawesome': {
					expand: true,
					flatten: true,
					src: [ '_font-awesome/fonts/*' ],
					dest: '<%= settings.location.deploy.fonts %>/'
				}
			}
		},

		concat: {
			options: {
				// Using the banner to inject a jQuery check.
				banner: '<%= jqueryCheck %>',
				stripBanners: false
			},
			bootstrapjs: {
				src: ( function() {
						var cwd = settings.location.bootstrap.local + '/';
						var arr = settings.tasks.concat.bootstrapjs.src;
						return arr.map(function(file) { return cwd + "/" + file; });
						}()
				),
				dest: '<%= settings.location.deploy.js %>/<%= settings.filename.js %>'
			}
		},

		uglify: {
			options: { report: 'min', compress: true },
			bootstrap: { src: ['<%= concat.bootstrapjs.dest %>'], dest: '<%= settings.location.deploy.js %>/<%= settings.filename.jsmin %>' }
		},

		less: {
			compileCore: {
				options: {
					strictMath: true,
					outputSourceFiles: true
				},
				files: { '<%= settings.location.deploy.css %>/<%= settings.filename.css %>': '<%= settings.location.bootstrap.local %>/less/custom.less' }
			}
		},

		cssmin: {
			combine: {
				files: {
					'<%= settings.location.deploy.css %>/<%= settings.filename.cssmin %>': [ '<%= settings.location.deploy.css %>/<%= settings.filename.css %>', '_font-awesome/css/font-awesome.css' ]
				}
			}
		}

	});

	// This one-liner replaces multiple grunt.loadNpmTasks() calls
	// See http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

	// Bootstrap tasks
	//    cleanup
	grunt.registerTask( 'clean-bootstrap', [ 'clean:bootstrap-source' ] );
	grunt.registerTask( 'clean-fonts', [ 'clean:bootstrap-fonts' ] );

	//    constructing
	grunt.registerTask( 'fetch-fresh-bootstrap', [ 'copy:bootstrap-source' ] );
	grunt.registerTask( 'apply-bootstrap-tweaks', [ 'copy:bootstrap-tweaks' ] );
	grunt.registerTask( 'update-fonts', [ 'clean-fonts', 'copy:stage-fonts' ] );
	grunt.registerTask( 'bootstrap', [ 'clean-bootstrap', 'fetch-fresh-bootstrap', 'apply-bootstrap-tweaks', 'update-fonts' ] );

	// Less and css tasks
	grunt.registerTask( 'clean-css', [ 'clean:css' ] );
	grunt.registerTask( 'less-compile', [ 'less:compileCore' ]);
	grunt.registerTask( 'css-minify', [ 'cssmin' ]);
	grunt.registerTask( 'css', [ 'clean-css', 'less-compile', 'css-minify']);

	// js tasks
	grunt.registerTask( 'clean-js', [ 'clean:js' ] );
	grunt.registerTask( 'js-bootstrap', ['clean-js', 'concat:bootstrapjs']);
	grunt.registerTask( 'js-minify', [ 'uglify:bootstrap']);
	grunt.registerTask( 'js', [ 'js-bootstrap', 'js-minify' ]);

	// all
	grunt.registerTask(  'clean-all', ['clean-bootstrap', 'clean-fonts', 'clean-css', 'clean-js' ]);
	grunt.registerTask(  'default', ['bootstrap', 'css', 'js' ]);

};

