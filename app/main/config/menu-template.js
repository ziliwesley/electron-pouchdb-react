// Electron
import app from 'app';

//
// Module Exports
// --------------------------------------------------

/**
 * Return the template of the application's menu
 * @param  {BrowserWindow} mainWin Main Window of the application
 * @return {Menu}                  Menu template of the main window
 */
export default function (mainWin) {
    // Template for the application menus
    return [{
        label: app.getName(),
        submenu: [{
            label: 'About'
        }, {
            type: 'separator'
        }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function () {
                return app.quit();
            }
        }]
    }, {
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'Cmd+Z',
            role: 'undo'
        }, {
            label: 'Redo',
            accelerator: 'Shift+Cmd+Z',
            role: 'redo'
        }, {
            type: 'separator'
        }, {
            label: 'Cut',
            accelerator: 'Cmd+X',
            role: 'cut'
        }, {
            label: 'Copy',
            accelerator: 'Cmd+C',
            role: 'copy'
        }, {
            label: 'Paste',
            accelerator: 'Cmd+V',
            role: 'paste'
        }, {
            label: 'Select All',
            accelerator: 'Cmd+A',
            role: 'selectall'
        }]
    }, {
        label: 'View',
        submenu: [{
            label: 'Toggle &Developer Tools',
            accelerator: 'Alt+Command+I',
            click: function () {
                return mainWin.toggleDevTools();
            }
        }]
    }];
}
