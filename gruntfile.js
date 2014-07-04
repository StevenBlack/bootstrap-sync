/* jshint node: true */

module.exports = function( grunt ) {
	'use strict';

	// Project configuration.
	grunt.initConfig({

		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),

		clean: { 'bootstrap-source': [ 'bootstrap/' ] },

		copy: {
			'bootstrap-source': {
				nonull: true,
				expand: true,
				cwd: '<%= pkg.config.location.bootstrap %>/',
				src: [ 'fonts/*', 'js/*', 'less/*' ],
				dest: 'bootstrap/',
			},
			'bootstrap-tweaks': {
				src: [ 'less/*' ],
				dest: 'bootstrap/',
			}
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );

	// Bootstrap tasks
	grunt.registerTask( 'clean-bootstrap', [ 'clean:bootstrap-source' ] );
	grunt.registerTask( 'fetch-fresh-bootstrap', [ 'copy:bootstrap-source' ] );
	grunt.registerTask( 'apply-bootstrap-tweaks', [ 'copy:bootstrap-tweaks' ] );
	grunt.registerTask( 'bootstrap', [ 'clean-bootstrap', 'fetch-fresh-bootstrap', 'copy:bootstrap-tweaks' ] );
};

