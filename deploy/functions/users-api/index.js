"use strict";

const express = require("express");
const db = require("./db");
const app = express();
const usersRouter = require("./users-router");

app.use(express.json());
app.use("/users", usersRouter.usersRouter);

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
