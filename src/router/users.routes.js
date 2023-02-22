const { Router } = require("express");

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = Router();

const userController =  new UserController();

usersRouter.post("/", userController.create);
usersRouter.put("/", ensureAuthenticated, userController.update);

module.exports = usersRouter;