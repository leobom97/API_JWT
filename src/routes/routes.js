const express = require("express");
const LoginController = require("../Controllers/LoginController");
const routes = express.Router();
const UserController = require("../Controllers/UserController");

const AuthMiddleware = require("../Middleware/AuthMiddleware");

routes.get("/users", AuthMiddleware, UserController.show);
routes.post("/user", UserController.store);
routes.post("/login", LoginController.index);

module.exports = routes;
