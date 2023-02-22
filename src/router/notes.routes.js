const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const notesRouter = Router();

const notesController =  new NotesController();

notesRouter.use(ensureAuthenticated);

notesRouter.get("/", notesController.index);
notesRouter.delete("/:id", notesController.delete);
notesRouter.get("/:id", notesController.show);
notesRouter.post("/", notesController.create);

module.exports = notesRouter;