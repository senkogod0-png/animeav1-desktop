const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopApp", {
  reloadHome: () => ipcRenderer.invoke("reload-home")
});
