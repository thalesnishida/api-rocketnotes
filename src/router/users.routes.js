const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRouter = Router();
const upload = multer(uploadConfig.MULTER);

const userController = new UserController();

usersRouter.post("/", userController.create);
usersRouter.put("/", ensureAuthenticated, userController.update);
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  (request, response) => {
    console.log(request.file.filename);
    return response.json();
  }
);

module.exports = usersRouter;
