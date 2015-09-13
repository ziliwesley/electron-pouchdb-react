// io.js
import path from 'path';

// Electron
import app from 'app';
import BrowserWindow from 'browser-window';
import Menu from 'menu';

// Libraries
import menuTmpl from './config/menu-template';

//
// Variables
// --------------------------------------------------

// Path of folder that contains all client files
let clientDir = path.resolve(__dirname, '../client');

/**
 * Entry of the main process
 */
export default function main () {
    let cleanupTasks = [];

    // Executed after the electron shell is ready
    app.on('ready', function () {
    	let mainWin = new BrowserWindow({
            'width': 900,
            'height': 610,
            'min-width': 900,
            'min-height': 610
        });

        // Load static client page
        console.log(`loading \"file://${clientDir}/index.html\"`);
        mainWin.loadUrl(`file://${clientDir}/index.html`);

        // Set application's menu
        Menu.setApplicationMenu(
            Menu.buildFromTemplate(menuTmpl(mainWin)));
    });

    // Executed after all windows are closed by the user
    app.on('window-all-closed', function () {
        console.log('all window closed, terminating the main process.');
        app.quit();
    });

    // Executed before the main process actually terminated.
    // It can be treated as the *last changce* for saving works
    // not done.
    app.on('will-quit', function () {
        console.log('main process is about to be terminated');

        // Run all cleanup tasks
        cleanupTasks.forEach((task) => {
            task();
        });
    });
};
