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
