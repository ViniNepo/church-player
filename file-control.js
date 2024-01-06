const express = require('express')
const fileControl = express()
const port = 8000
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

fileControl.use(cors(corsOptions))

const multipartFilesMiddleware = multipart({
  uploadDir : path.join(__dirname,'./dist/church-player/assets/files'),
  filename: function(filename, callback){
    callback(filename);
  }
});

const multipartImagesMiddleware = multipart({
  uploadDir : path.join(__dirname,'./dist/church-player/assets/images'),
  filename: function(filename, callback){
    callback(filename);
  }
});

fileControl.use(bodyParser.json());
fileControl.use(bodyParser.urlencoded({
  extended: true
}));

fileControl.get('/api/ping', (req, res) => {
  res.json({
    'message': 'hello'
  });
});

fileControl.post('/api/uploadFile', multipartFilesMiddleware, (req, res) => {
  const files = req.files
  res.json({message: files})
});

fileControl.delete('/api/deleteFile', (req, res) => {
  const { fileName, directoryName } = req.body;

  if (!fileName || !directoryName) {
    return res.status(400).json({ error: 'Informe o nome do arquivo e o nome do diretório.' });
  }

  const filePath = path.join(__dirname, `./dist/church-player/assets/${directoryName}/`, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao excluir o arquivo.' });
    }

    return res.json({ message: 'Arquivo excluído com sucesso.' });
  });
});

fileControl.post('/api/uploadImage', multipartImagesMiddleware, (req, res) => {
  const files = req.files
  res.json({message: files})
});

fileControl.get('/api/open-file', (req, res) => {
  const fileName = req.query.fileName;

  if (!fileName) {
    res.status(400).send('Nome do arquivo não fornecido.');
    return;
  }

  const pathToFile = path.join(__dirname,`./dist/church-player/assets/images/${fileName}`);

  fs.readFile(pathToFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      res.status(500).send('Erro ao ler o arquivo');
      return;
    }

    openFileWithDefaultApp(pathToFile);
    res.status(200)
    res.send('Arquivo aberto com sucesso!');
  });
});

function openFileWithDefaultApp(filePath) {
  const command = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';

  exec(`${command} "${filePath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao abrir o arquivo: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Erro no comando: ${stderr}`);
      return;
    }
    console.log('Arquivo aberto com sucesso!');
  });
}

fileControl.listen(port, () => console.log(`Example app listening on port ${port}!`))


// Json server
const pkg = require('json-server');
const { create, router: _router, defaults } = pkg;

const server = create();
const router = _router('./db.json');
const jsonMiddleware = defaults();

const corsJson = {
  origin: '*',
  optionsSuccessStatus: 200
};

server.use(cors(corsJson))
server.use(router);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
