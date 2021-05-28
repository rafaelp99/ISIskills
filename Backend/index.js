const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const controller = require('./controllers/controller')
const app = express();
const db = require('./config/connect')
const session = require('express-session')
const request = require('request');
const { mostrarCompra, mostrarFatura } = require("./controllers/controller");
require('dotenv').config()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", 'true')
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});



// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//usar cookies
app.use(cookieParser());

//express sessions
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//rotas
app.get("/", (req, res) => {
  res.send("Hello");
});
//rota para criar cliente no hubspot
app.post("/criarClient", controller.createCliente)

//rota login

app.post("/login", controller.login)

//rota criar Professor Moloni

app.post('/registarProfessor', controller.criarProfessor)

//rota criar curso

app.post('/criarcurso', controller.criarCurso)

//rota para ir buscar cursos

app.get('/getcursos', controller.getCursos)

//rota para ir buscar curso por id

app.get('/getcurso/:id', controller.getCursoId)

//rota para criar fatura de uma compra de um curso
app.post('/comprarcurso', controller.criarCompra)

//rota para mostrar as faturas todas de um utilizador

app.post('/getcursosinscrito', controller.mostrarCompra)

app.post('/mostrarfatura', controller.mostrarFatura)

// set port, listen for requests
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
