const {
  app,
  BrowserWindow,
  globalShortcut
} = require('electron')

let appWindow

function createWindow() {
  appWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
  })

  appWindow.loadFile('dist/church-player/index.html');

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

app.whenReady().then(() => {
  createWindow()
})
