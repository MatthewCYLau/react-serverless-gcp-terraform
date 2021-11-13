const express = require("express");
const db = require("../db");
const router = express.Router();

let pool;

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

router.post("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  }
  pool = pool || (await db.createPoolAndEnsureSchema());
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

router.get("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");
    res.status(204).send("");
  }
  pool = pool || (await db.createPoolAndEnsureSchema());

  try {
    const users = await getUsersFromDatabase(pool);
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Unable to create user");
  }
});

module.exports = {
  usersRouter: router,
};
