const express = require('express');
const http = require("http");
const hostname = '127.0.0.1';
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Servidor listening on port ${port}!`)
});