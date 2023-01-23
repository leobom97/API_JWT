const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const morgan = require("morgan");
require("./database/connection");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.connection();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use((req, res, next) => {
      //Configuração do Cors
      res.header("Access-Controll-Allow-Origin", "*");
      res.header("Access-Controll-Allow-Methods", "GET, POST, PUT, DELETE");
      res.header(
        "Access-Controll-Allow-Headers",
        "Access, Content-type, Authorization, Acept, Origin, X-Requested-With"
      );

      this.app.use(cors());
      next();
    });
  }

  connection() {}

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;
