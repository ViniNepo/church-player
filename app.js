const path = require('path');
const { app, BrowserWindow, globalShortcut } = require('electron');
const { spawn } = require('child_process');
const url = require("url");
const http = require('http');

let appWindow;
let goProcess;

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
  });

  appWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/dist/church-player/index.html'),
    protocol: 'file',
    slashes: true
  }));

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
  return new Promise((resolve, reject) => {
    const goExecutablePath = path.join(__dirname, 'church_player_backend');
    goProcess = spawn(goExecutablePath, [], {
      stdio: 'inherit',
    });

    goProcess.on('error', (err) => {
      reject(`Failed to start Go process: ${err}`);
    });

    goProcess.on('close', (code) => {
      console.log(`Go process exited with code ${code}`);
    });

    // Aguarde um tempo para o backend inicializar
    setTimeout(() => {
      validateBackend().then(resolve).catch(reject);
    }, 2000); // 2 segundos de espera antes de checar se o backend está rodando
  });
}

function validateBackend(retries = 5, delay = 2000) {
  return new Promise((resolve, reject) => {
    function attempt(retryCount) {
      const options = {
        hostname: 'localhost',
        port: 8080, // Substitua pela porta onde seu backend está rodando
        path: '/ping', // Rota que você quer chamar
        timeout: 2000, // Timeout de 2 segundos
      };

      const req = http.get(options, (res) => {
        if (res.statusCode === 200) {
          console.log(`Backend responded with status code ${res.statusCode} on attempt ${retryCount + 1}`);
          resolve();
        } else {
          console.log(`Backend responded with status code ${res.statusCode} on attempt ${retryCount + 1}`);
          if (retryCount < retries - 1) {
            setTimeout(() => attempt(retryCount + 1), delay);
          } else {
            reject(`Failed to validate backend after ${retries} attempts.`);
          }
        }
      });

      req.on('error', (err) => {
        console.log(`Error contacting backend on attempt ${retryCount + 1}: ${err.message}`);
        if (retryCount < retries - 1) {
          setTimeout(() => attempt(retryCount + 1), delay);
        } else {
          reject(`Failed to validate backend after ${retries} attempts.`);
        }
      });

      req.end();
    }

    attempt(0);
  });
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
  startBackend()
    .then(() => {
      console.log('Backend is running. Starting Electron app.');
      createWindow();
    })
    .catch((err) => {
      console.error(err);
      app.quit(); // Fecha o app se o backend não conseguir iniciar ou validar
    });
});

app.on('will-quit', () => {
  if (goProcess) {
    goProcess.kill();
  }
});
