const {
  app,
  BrowserWindow
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

app.whenReady().then(() => {
  createWindow()
})
