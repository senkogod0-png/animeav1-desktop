const { app, BrowserWindow, ipcMain, Menu, shell } = require("electron");
const path = require("node:path");

const HOME_URL = "https://animeav1.com/";
const TRUSTED_HOSTS = new Set(["animeav1.com", "www.animeav1.com"]);

let mainWindow;

function isTrustedUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return url.protocol === "https:" && TRUSTED_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function showHome() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.loadURL(HOME_URL);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 620,
    title: "AnimeAV1 Desktop",
    backgroundColor: "#101216",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, "preload.js"),
      spellcheck: false
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isTrustedUrl(url)) {
      mainWindow.loadURL(url);
    } else {
      shell.openExternal(url);
    }

    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!isTrustedUrl(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.webContents.on("before-input-event", (event, input) => {
    const key = input.key.toLowerCase();
    const refreshShortcut = input.control && key === "r";

    if (input.type === "keyDown" && (input.key === "F5" || refreshShortcut)) {
      event.preventDefault();
      mainWindow.webContents.reload();
    }

    if (input.type === "keyDown" && input.key === "F11") {
      event.preventDefault();
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  });

  mainWindow.webContents.on("did-fail-load", (_event, _code, _description, url, isMainFrame) => {
    if (isMainFrame && isTrustedUrl(url)) {
      mainWindow.loadFile(path.join(__dirname, "offline.html"));
    }
  });

  showHome();
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();

  ipcMain.handle("reload-home", showHome);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
