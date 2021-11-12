"use strict";

const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());

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

const getUsersFromDatabase = async (pool) => {
  return await pool
    .select("user_id", "username", "time_created")
    .from("users")
    .orderBy("time_created", "desc");
};

const insertUserToDatabase = async (pool, user) => {
  try {
    return await pool("users").insert(user);
  } catch (err) {
    throw Error(err);
  }
};

app.post("/users", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  }
  pool = pool || (await createPoolAndEnsureSchema());
  const { username, password } = req.body;
  const timestamp = new Date();
  const user = {
    username,
    password,
    time_created: timestamp,
  };

  try {
    await insertUserToDatabase(pool, user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to create user").end();
    return;
  }
  res.status(200).send("User created").end();
});

app.get("/users", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  }
  pool = pool || (await createPoolAndEnsureSchema());

  try {
    const users = await getUsersFromDatabase(pool);
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Unable to create user");
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
