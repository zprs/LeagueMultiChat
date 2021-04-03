const e = require('cors');
const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const robot = require('robotjs');

function createWindow () {
  const win = new BrowserWindow({
    width: 300,
    height: 280,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

ipcMain.on('typeText', (event, data) => {
  var text = data.text;
  var allChat = data.allChat;

  robot.keyTap("enter");
  robot.typeString(text);
  robot.keyTap("enter");
});