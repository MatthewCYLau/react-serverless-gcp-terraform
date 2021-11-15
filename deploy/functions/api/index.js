"use strict";

const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const usersRouter = require("./users-router");
const todosRouter = require("./todos-router");
const authRouter = require("./auth-router");

app.use(express.json());
app.use(cors());
app.use("/users", usersRouter.usersRouter);
app.use("/todos", todosRouter.todosRouter);
app.use("/auth", authRouter.authRouter);

let pool;

app.use(async (_req, _res, next) => {
  if (pool) {
    return next();
  }
  try {
    pool = await db.createPoolAndEnsureSchema();
    next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

app.get("/ping", (_req, res) => {
  res.status(200).send("pong!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  throw err;
});

module.exports = {
  app,
};
