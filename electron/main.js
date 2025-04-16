const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    icon: path.join(app.getAppPath(), 'assets', 'icon.png'), 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile('./frontend/index.html');
  ipcMain.on('save-score', async(_, scoreData) => {
    const logDir = path.join(app.getPath('home'), 'tictaktoe-game');
    const savePath = path.join(logDir, '/game-score.txt');
    fs.mkdir(logDir, { recursive: true }, (err) => {
        if (err) {
          console.error('Failed to create log directory:', err);
          return;
        }    
        fs.appendFile(savePath, scoreData, (err) => {
        if (err) {
            console.error('Error saving score:', err);
        } else {
            new Notification({
                title: 'Game Log Updated',
                body: `Game result has been logged.`,
            }).show();
        }
        });
    })
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
