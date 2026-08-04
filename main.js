const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// 双显卡笔记本GPU兼容性
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('force_high_performance_gpu');
  app.commandLine.appendSwitch('use-angle', 'd3d11');
}
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('disable-gpu-driver-bug-workarounds');

let mainWindow;
let gpuCrashed = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    resizable: true,
    fullscreen: true,
    title: '案件推演',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.setMenuBarVisibility(false);
}

// GPU崩溃恢复
app.on('gpu-process-crashed', (_event, killed) => {
  gpuCrashed = true;
  if (!killed) {
    app.relaunch();
  }
  app.quit();
});

// 渲染进程崩溃恢复
app.on('render-process-gone', (_event, _webContents, details) => {
  if (!gpuCrashed) {
    app.relaunch();
    app.quit();
  }
});

ipcMain.on('set-window-size', (_event, w, h) => {
  if (mainWindow) {
    mainWindow.setFullScreen(false);
    mainWindow.setSize(w, h);
    mainWindow.center();
  }
});

ipcMain.on('enter-fullscreen', () => {
  if (mainWindow) {
    mainWindow.setFullScreen(true);
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
