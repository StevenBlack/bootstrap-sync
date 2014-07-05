/* jshint node: true */

module.exports = function( grunt ) {
	'use strict';

	var _        = require('lodash');
	var pkg      = grunt.file.readJSON( 'package.json' );
	var options  = _.merge( {}, grunt.file.readJSON( 'options.json' ) );
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
				expand: true,
				flatten: true,
				src: [ '<%= settings.location.bootstrap.local %>/fonts/*' ],
				dest: '<%= settings.location.deploy.fonts %>/'
			}
		},

		concat: {
			options: {
				banner: '<%= jqueryCheck %>',
				stripBanners: false
			},
			bootstrapjs: {
				src: [
					'<%= settings.location.bootstrap.local %>/js/transition.js',
					'<%= settings.location.bootstrap.local %>/js/alert.js',
					'<%= settings.location.bootstrap.local %>/js/button.js',
					'<%= settings.location.bootstrap.local %>/js/carousel.js',
					'<%= settings.location.bootstrap.local %>/js/collapse.js',
					'<%= settings.location.bootstrap.local %>/js/dropdown.js',
					'<%= settings.location.bootstrap.local %>/js/modal.js',
					'<%= settings.location.bootstrap.local %>/js/tooltip.js',
					'<%= settings.location.bootstrap.local %>/js/popover.js',
					'<%= settings.location.bootstrap.local %>/js/scrollspy.js',
					'<%= settings.location.bootstrap.local %>/js/tab.js',
					'<%= settings.location.bootstrap.local %>/js/affix.js'
				],
				dest: '<%= settings.location.deploy.js %>/<%= settings.filename.js %>'
			}
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
			'dist': {
				'src': [ '<%= settings.location.deploy.css %>/<%= settings.filename.css %>' ],
				'dest': '<%= settings.location.deploy.css %>/<%= settings.filename.cssmin %>'
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
	grunt.registerTask( 'less-compile', ['less:compileCore']);
	grunt.registerTask( 'css-minify', ['cssmin:dist']);
	grunt.registerTask( 'css', [ 'clean-css', 'less-compile', 'css-minify']);

	// js tasks
	grunt.registerTask( 'clean-js', [ 'clean:js' ] );
	grunt.registerTask( 'js-bootstrap', ['clean-js', 'concat:bootstrapjs']);
	grunt.registerTask( 'js', [ 'js-bootstrap' ]);

	// all
	grunt.registerTask(  'clean-all', ['clean-bootstrap', 'clean-fonts', 'clean-css', 'clean-js' ]);
	grunt.registerTask(  'default', ['bootstrap', 'css', 'js' ]);

};

