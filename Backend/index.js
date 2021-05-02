const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const controller = require('./controllers/controller')
const app = express();
const db = require('./config/connect')
const session = require('express-session')

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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});