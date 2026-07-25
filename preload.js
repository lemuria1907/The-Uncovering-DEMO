const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    setWindowSize: (w, h) => ipcRenderer.send('set-window-size', w, h),
    enterFullscreen: () => ipcRenderer.send('enter-fullscreen')
});
