/* jshint node: true */

module.exports = function( grunt ) {
	"use strict";

	// Project configuration.
	grunt.initConfig({

		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ),

		copy: {
			"bootstrap-source": {
				nonull: true,
				expand: true,
				cwd: '<%= pkg.config.location.bootstrap %>/',
				src: [ 'fonts/*', 'js/*', 'less/*' ],
				dest: 'bootstrap/',
			}
		}

	});

	grunt.loadNpmTasks( 'grunt-contrib-copy' );

	grunt.registerTask( 'fetch-fresh', [ 'copy:bootstrap-source' ] );

};

