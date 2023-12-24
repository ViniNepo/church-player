const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();

app.listen(8000, () => {
  console. log('Servidor porta 8000');
})

