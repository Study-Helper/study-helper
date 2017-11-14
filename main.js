import { app, BrowserWindow } from 'electron';

let mainWindow = null;
let splash = null;

const WINDOW_WIDTH = 880;
const WINDOW_HEIGHT = 615;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    resizable: false
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// TODO: Commented for now.
// app.on('ready', () => {
//   // Create the Main window and don't show it right away.
//   mainWindow = new BrowserWindow({
//     width: WINDOW_WIDTH,
//     height: WINDOW_HEIGHT,
//     resizable: false,
//     show: false
//   });

//   // Create the Splash window.
//   splash = new BrowserWindow({
//     width: WINDOW_WIDTH,
//     height: WINDOW_HEIGHT,
//     frame: false,
//     alwaysOnTop: true,
//     resizable: false
//   });

//   splash.loadURL('file://' + __dirname + '/splash.html');
//   mainWindow.loadURL('file://' + __dirname + '/index.html');

//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });
  
//   // If the Main window is ready to show, destroy the Splash window and show up the Main window.
//   mainWindow.once('ready-to-show', () => {
//     splash.destroy();
//     mainWindow.show();
//   });
// });
