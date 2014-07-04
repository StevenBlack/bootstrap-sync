/* jshint node: true */

module.exports = function( grunt ) {
	'use strict';

	// Project configuration.
	grunt.initConfig({

		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),

		clean: {
			'bootstrap-source': [ 'bootstrap/' ],
			'bootstrap-fonts': [ 'fonts/' ]
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
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-less' );


	// Bootstrap tasks
	grunt.registerTask( 'clean-bootstrap', [ 'clean:bootstrap-source' ] );
	grunt.registerTask( 'clean-fonts', [ 'clean:bootstrap-fonts' ] );

	grunt.registerTask( 'fetch-fresh-bootstrap', [ 'copy:bootstrap-source' ] );
	grunt.registerTask( 'apply-bootstrap-tweaks', [ 'copy:bootstrap-tweaks' ] );
	grunt.registerTask( 'update-fonts', [ 'copy:stage-fonts' ] );
	grunt.registerTask( 'bootstrap', [ 'clean-bootstrap', 'clean-bootstrap', 'fetch-fresh-bootstrap', 'apply-bootstrap-tweaks', 'update-fonts' ] );

	// Less tasks
	grunt.registerTask('less-compile', ['less:compileCore']);

};

