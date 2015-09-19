'use strict';

//
// Dependencies
// --------------------------------------------------

var gulp = require('gulp');
var gutil = require('gulp-util');
var jetpack = require('fs-jetpack');
var electron = require('electron-prebuilt');
var childProcess = require('child_process');
var Promise = require('bluebird');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackHotDevConfig = require('../webpack/hot-dev-server.config');

//
// Variables
// --------------------------------------------------

var projectDir = jetpack.cwd('app');
var app;
var devServer;
var runTasks;

//
// Inner functions
// --------------------------------------------------

/**
 * Terminate the host process
 * @return {void}
 */
function terminate() {
    process.exit();
}

/**
 * Start the webpack dev server
 * @return {Promise}
 */
function startDevServer() {
	return new Promise(function (resolve, reject) {
		gutil.log('Starting webpack dev server');

        // To enable HMR with node.js API:
        // - add an entry point to the webpack configuration:
        //   webpack/hot/dev-server.
        // - add the new webpack.HotModuleReplacementPlugin() to the webpack
        //   configuration.
        // - add hot: true the the webpack-dev-server configuration to enable
        //   HMR on the server.
        //
        // See http://webpack.github.io/docs/webpack-dev-server.html#api
        webpackHotDevConfig.entry.app.unshift('webpack/hot/dev-server');

	    devServer = new WebpackDevServer(webpack(webpackHotDevConfig), {
            contentBase: 'app/client',
            // Enable HMR
			hot: true,
            stats: {
                // Add colors to the output.
                colors: true
            }
		});

		// @todo make port number configurable
		devServer.listen(9090, 'localhost', function (err, result) {
			var url;

			if (err) {
				gutil.log('webpack dev server failed to start:',
					gutil.colors.red(err.toString()));

				reject(err);
			} else {
				url = 'http://localhost:9090';

				gutil.log('webpack dev server started: ' +
					gutil.colors.magenta(url));

				resolve(url);
			}
		});
	});
}

/**
 * Start an electron instance in child process
 * @param  {string} url a url for electron to load
 */
function startElectron(url) {
    gutil.log('Starting electron process');

    app = childProcess.spawn(electron, [
        projectDir.path(),
		url
    ], {
        stdio: 'inherit'
    });

    // Kill the host process when use closed the app
    app.on('close', terminate);
}

/**
 * Kill the electron instance
 */
function killElectron() {
    gutil.log('Killing electron process');
    app.kill();
}

//
// Task definitions
// --------------------------------------------------

// Individual task can be accessed like:
// require('./task/run.js')['TASK_NAME'];
module.exports = runTasks = {
    // Start and auto-reload the electron shell
    start: function (done) {
        // Ensure to start in development mode
        process.env.NODE_ENV = 'development';

		startDevServer()
			.then(function(url) {
				// Start electron
		        startElectron(url);

				// Restart the main process
		        gulp.watch(projectDir.path('main/**/*.js'), function() {
					app.removeListener('close', terminate);
				    killElectron();
				    startElectron(url);
				});

				done();
			}, function() {
				done();
			});
    }
};

//
// Tasks bindings
// --------------------------------------------------

gulp.task('start', runTasks.start);
