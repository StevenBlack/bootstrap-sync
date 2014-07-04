/* jshint node: true */

module.exports = function( grunt ) {
	'use strict';

	// Project configuration.
	grunt.initConfig({

		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),

		clean: {
			'bootstrap-source': [ 'bootstrap/' ],
			'bootstrap-fonts': [ 'fonts/' ],
			'css': [ 'css/' ]
		},

		copy: {
			'bootstrap-source': {
				nonull: true,
				expand: true,
				cwd: '<%= pkg.config.location.bootstrap.authoritative %>/',
				src: [ 'fonts/*', 'js/*', 'less/**' ],
				dest: 'bootstrap/',
			},
			'bootstrap-tweaks': {
				src: [ 'less/*' ],
				dest: '<%= pkg.config.location.bootstrap.local %>/',
			},
			'stage-fonts': {
				expand: true,
				flatten: true,
				src: [ '<%= pkg.config.location.bootstrap.local %>/fonts/*' ],
				dest: '<%= pkg.config.location.deploy.fonts %>/'
			}
		},

		less: {
			compileCore: {
				options: {
					strictMath: true,
					outputSourceFiles: true
				},
				files: { '<%= pkg.config.location.deploy.css %>/<%= pkg.config.filename.css %>': '<%= pkg.config.location.bootstrap.local %>/less/custom.less' }
			}
		},

		cssmin: {
			'dist': {
				'src': [ '<%= pkg.config.location.deploy.css %>/<%= pkg.config.filename.css %>' ],
				'dest': '<%= pkg.config.location.deploy.css %>/<%= pkg.config.filename.cssmin %>'
			}
		},

	});

	// This one-liner replaces multiple grunt.loadNpmTasks() calls
	// See http://www.thomasboyt.com/2013/09/01/maintainable-grunt.html
	require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

	// Bootstrap tasks
	//    cleanup
	grunt.registerTask( 'clean-bootstrap', [ 'clean:bootstrap-source' ] );
	grunt.registerTask( 'clean-fonts', [ 'clean:bootstrap-fonts' ] );
	grunt.registerTask( 'clean-css', [ 'clean:css' ] );

	//    construscting
	grunt.registerTask( 'fetch-fresh-bootstrap', [ 'copy:bootstrap-source' ] );
	grunt.registerTask( 'apply-bootstrap-tweaks', [ 'copy:bootstrap-tweaks' ] );
	grunt.registerTask( 'update-fonts', [ 'copy:stage-fonts' ] );
	grunt.registerTask( 'bootstrap', [ 'clean-bootstrap', 'fetch-fresh-bootstrap', 'apply-bootstrap-tweaks', 'update-fonts' ] );

	// Less and css tasks
	grunt.registerTask(  'less-compile', ['less:compileCore']);
	grunt.registerTask(  'css-minify', ['cssmin:dist']);
	grunt.registerTask(  'css', [ 'clean-css', 'less-compile', 'css-minify']);

};

