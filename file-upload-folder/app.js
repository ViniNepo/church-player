const express = require('express')
const app = express()
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

app.use(cors(corsOptions))

const multipartFilesMiddleware = multipart({
  uploadDir : path.join(__dirname,'../src/assets/files'),
  filename: function(filename, callback){
    callback(filename);
  }
});

const multipartImagesMiddleware = multipart({
  uploadDir : path.join(__dirname,'../src/assets/images'),
  filename: function(filename, callback){
    callback(filename);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/api/ping', (req, res) => {
  res.json({
    'message': 'hello'
  });
});

app.post('/api/uploadFile', multipartFilesMiddleware, (req, res) => {
  res.json({
    'message': 'File uploaded succesfully.'
  });
});

app.post('/api/uploadImage', multipartImagesMiddleware, (req, res) => {
  res.json({
    'message': res.json
  });
});



app.get('/api/open-file', (req, res) => {
  const fileName = req.query.fileName;

  if (!fileName) {
    res.status(400).send('Nome do arquivo não fornecido.');
    return;
  }

  const pathToFile = `../src/assets/files/${fileName}`; // Substitua pelo caminho real do seu arquivo

  fs.readFile(pathToFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      res.status(500).send('Erro ao ler o arquivo');
      return;
    }

    openFileWithDefaultApp(pathToFile);
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
