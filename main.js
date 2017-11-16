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

  /* Create the Main window, but don't show it right away. */
  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    resizable: false,
    show: false
  });

  /* Create the Splash window. */
  splash = new BrowserWindow({
    width: 430,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    resizable: false
  });

  splash.loadURL('file://' + __dirname + '/splash.html');
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  /**
   * Once the Main window is fully loaded and ready to show, wait one seconds and
   * then close the splash screen and show the main one.
   * Wait one second so that that weird flicker doesn't happen (i.e. swapping windows at
   * the exact moment where 'ready-to-show' is triggered).
   */
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => { 
      splash.close();
      mainWindow.show();
    }, 1000);
  });
});
