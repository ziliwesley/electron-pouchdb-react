'use strict';

//
// Dependencies
// --------------------------------------------------

var gulp = require('gulp');
var gutil = require('gulp-util');
var jetpack = require('fs-jetpack');
var electron = require('electron-prebuilt');
var childProcess = require('child_process');

//
// Variables
// --------------------------------------------------

var projectDir = jetpack.cwd('app');
var app;

//
// Inner functions
// --------------------------------------------------

/**
 * Terminate the host process
 */
function terminate() {
    process.exit();
}

/**
 * Start an electron instance in child process
 */
function startElectron() {
    gutil.log('Starting electron process');

    app = childProcess.spawn(electron, [
        projectDir.path()
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

/**
 * Restart the electron instance
 */
function restartElectron() {
    app.removeListener('close', terminate);
    killElectron();
    startElectron();
}

//
// Task definitions
// --------------------------------------------------

// Individual task can be accessed like:
// require('./task/run.js')['TASK_NAME'];
var runTasks = module.exports = {
    // Start and auto-reload the electron shell
    start: function () {
        // Ensure to start in development mode
        process.env.NODE_ENV = 'development';

        // Start electron
        startElectron();

        // Restart the main process
        gulp.watch(projectDir.path('main/**/*.js'), restartElectron);
    }
};

//
// Tasks bindings
// --------------------------------------------------

gulp.task('start', runTasks.start);
