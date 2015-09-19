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
const clientDir = path.resolve(__dirname, '../client');

/**
 * Entry of the main process
 */
export default function main() {
    const cleanupTasks = [];
    let url = `file://${clientDir}/index.html`;

    // Executed after the electron shell is ready
    app.on('ready', () => {
        const mainWin = new BrowserWindow({
            'width': 900,
            'height': 460,
            'resizable': false
        });


        if (process.env.NODE_ENV === 'development') {
            // Load the url of the dev server
            url = `file://${clientDir}/index-dev.html`;
        }

        console.log(`loading url ${url}`);
        mainWin.loadUrl(url);

        // Set application's menu
        Menu.setApplicationMenu(
            Menu.buildFromTemplate(menuTmpl(mainWin)));
    });

    // Executed after all windows are closed by the user
    app.on('window-all-closed', () => {
        console.log('all window closed, terminating the main process.');
        app.quit();
    });

    // Executed before the main process actually terminated.
    // It can be treated as the *last changce* for saving works
    // not done.
    app.on('will-quit', () => {
        console.log('main process is about to be terminated');

        // Run all cleanup tasks
        cleanupTasks.forEach((task) => {
            task();
        });
    });
}
