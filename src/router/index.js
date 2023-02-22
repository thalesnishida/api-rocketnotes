const { Router } = require("express");

const usersRouter = require("./users.routes");
const tagsRouter = require("./tags.routes");
const notesRouter = require("./notes.routes");
const sessiosRouter  = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/sessions", sessiosRouter)
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);

module.exports = routes;