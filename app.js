const path = require('path');
const { app, BrowserWindow, globalShortcut } = require('electron');
const { spawn } = require('child_process');
const url = require("url");

let appWindow;
let goProcess;

function createWindow() {
  appWindow = new BrowserWindow({
    width: 1020,
    height: 680,
    minWidth: 1020,
    minHeight: 680,
    icon: path.join(__dirname, 'church-player-2.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
    show: false // Inicialmente, a janela estará oculta
  });

  appWindow.setMenuBarVisibility(false); // This hides the menu bar
  appWindow.setMenu(null); // This completely disables the menu bar

  appWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/dist/church-player/index.html'),
    protocol: 'file',
    slashes: true
  }));

  // Mostra a janela apenas quando o conteúdo estiver pronto
  appWindow.once('ready-to-show', () => {
    appWindow.show();
  });

  appWindow.on('closed', function () {
    appWindow = null;
  });

  // Kill the Go process when the app window is closed
  appWindow.on('close', () => {
    if (goProcess) {
      goProcess.kill();
    }
  });
}

function startBackend() {
  const goExecutablePath = path.join(__dirname, 'church_player_backend.exe');
  goProcess = spawn(goExecutablePath, [], {
    stdio: 'ignore', // Executa o processo em segundo plano
    detached: true   // Permite que o processo continue rodando em segundo plano
  });

  goProcess.unref(); // Desvincula o processo filho do processo pai

  goProcess.on('error', (err) => {
    console.error(`Failed to start Go process: ${err}`);
  });

  goProcess.on('close', (code) => {
    console.log(`Go process exited with code ${code}`);
  });
}

app.on('ready', () => {
  createWindow();  // Cria a janela do aplicativo
  startBackend();  // Inicia o backend de forma assíncrona
});

app.on('will-quit', () => {
  if (goProcess) {
    goProcess.kill();
  }
});
