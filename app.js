const path = require('path');
const {
  app,
  BrowserWindow,
  globalShortcut
} = require('electron')
const { shell } = require('electron')
const url = require("url");

let appWindow

function createWindow() {
  appWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    icon: path.join(__dirname, '/dist/church-player/assets/church-player-2.png'),
    webPreferences: {
      nodeIntegration: true
    }
  })

  appWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/dist/church-player/index.html'),
    protocol: 'file',
    slashes: true
  }));
  // appWindow.openDevTools()

  appWindow.on('closed', function () {
    appWindow = null
  })
}

app.on('browser-window-focus', function () {
  globalShortcut.register("CommandOrControl+R", () => {
    console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
    console.log("F5 is pressed: Shortcut Disabled");
  });
});
app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('F5');
});

app.on('ready', () => {
  createWindow()
})
