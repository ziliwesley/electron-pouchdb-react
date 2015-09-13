# Step 1. Setup the *live* coding environment

## Goals

Our main goal here:

*Restart* electron whenever there is a code change in the main process.

### Preparation

```bash
# at project's root directory
npm i electron-prebuilt gulp gulp-util fs-jetpack --save-dev

# change to app directory, create the folder it does not exist
cd app
npm i babel fs-jetpack --save
```

### Bootstrap the electron application

The folder structure of the application will be:

```
├── app                     // Base folder for the app
│   ├── client              // Contains html, stylesheet and
│   │                       // client side scripts
│   ├── main                // Contains scripts for the main
│   │                       // process
│   └── package.json        // Stores meta data and dependencies
│                           // of the app *(read by electron)*
│
├── *{Other folders}*       // tasks, resources, releases etc
```

### Scaffold the application

The application itself is relatively basic.

#### `app/client/index.html`

The client html page will be loaded inside electron:

See [`app/client/index.html`](https://github.com/ziliwesley/electron-pouchdb-react/blob/ff3c1ff56d841602f5ff0a99ee2327fa1dccdeec/app/client/index.html)

#### `app/main/index.js`

Application's entrance, `babel` is used to transpile subsequent files required.

```js
// Use the require hook to compile files written in es6 on the fly.
// see [Require Hook](https://babeljs.io/docs/usage/require/)
require('babel/register');

// Start the main process
require('./daemon')();
```

#### `app/main/daemon.js`

Application's *daemon module*, basic electron's "Hello World" example:

See [`app/main/daemon.js`](https://github.com/ziliwesley/electron-pouchdb-react/blob/ff3c1ff56d841602f5ff0a99ee2327fa1dccdeec/app/main/daemon.js)

### `tasks/run.js`

The task will start an electron instance in a child process; and restart it
whenever code changes to main process occur.

See [`tasks/run.js`](https://github.com/ziliwesley/electron-pouchdb-react/blob/ff3c1ff56d841602f5ff0a99ee2327fa1dccdeec/tasks/run.js)

```js
// ...
// Add dependencies

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

// Bind gulp task `start` to `runTasks.start`
// ...
```
