const express = require("express");
const db = require("../db");
const router = express.Router();

let pool;

const getTodosFromDatabase = async (pool) => {
  return await pool
    .select("todo_id", "subject", "body", "owner", "time_created")
    .from("todos")
    .orderBy("time_created", "desc");
};

const insertTodoToDatabase = async (pool, todo) => {
  try {
    return await pool("todos").insert(todo);
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
  const { subject, body, owner } = req.body;
  const timestamp = new Date();
  const todo = {
    subject,
    body,
    owner,
    time_created: timestamp,
  };

  try {
    await insertTodoToDatabase(pool, todo);
  } catch (err) {
    console.log(err);
    res.status(500).send("Unable to create todo");
    return;
  }
  res.status(200).send("Todo created");
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
    const todos = await getTodosFromDatabase(pool);
    return res.status(200).send(todos);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Unable to get todos");
  }
});

module.exports = {
  todosRouter: router,
};
