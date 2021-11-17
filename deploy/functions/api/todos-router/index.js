const express = require("express");
const db = require("../db");
const auth = require("../middleware/auth");
const router = express.Router();

let pool;

const getTodosFromDatabase = async (pool) => {
  return await pool
    .select("todo_id", "subject", "body", "username", "time_created")
    .from("todos")
    .orderBy("time_created", "desc");
};

const getTodosByUsernameFromDatabase = async (pool, username) => {
  return await pool
    .select("todo_id", "subject", "body", "username", "time_created")
    .from("todos")
    .where({ username: username })
    .orderBy("time_created", "desc");
};

const insertTodoToDatabase = async (pool, todo) => {
  try {
    return await pool("todos").insert(todo);
  } catch (err) {
    throw Error(err);
  }
};

const deleteTodoFromDatabase = async (pool, todo_id) => {
  try {
    return await pool("todos").where({ todo_id }).del();
  } catch (err) {
    throw Error(err);
  }
};

router.post("/", auth, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  pool = pool || (await db.createPoolAndEnsureSchema());
  const { subject, body } = req.body;
  const timestamp = new Date();
  const todo = {
    subject,
    body,
    username: req.user.username,
    time_created: timestamp,
  };

  try {
    await insertTodoToDatabase(pool, todo);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ errors: [{ message: "Error when creating todo" }] });
  }
  res.status(200).send("Todo created");
});

router.delete("/:id", auth, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  pool = pool || (await db.createPoolAndEnsureSchema());

  try {
    await deleteTodoFromDatabase(pool, req.params.id);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ errors: [{ message: "Error when deleting todo" }] });
  }
  res.status(200).send("Todo deleted");
});

router.get("/", async (_req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  pool = pool || (await db.createPoolAndEnsureSchema());

  try {
    const todos = await getTodosFromDatabase(pool);
    return res.status(200).send(todos);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ errors: [{ message: "Error when retriving todos" }] });
  }
});

router.get("/me", auth, async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  pool = pool || (await db.createPoolAndEnsureSchema());

  try {
    const todos = await getTodosByUsernameFromDatabase(pool, req.user.username);
    return res.status(200).send(todos);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ errors: [{ message: "Error when retriving todos" }] });
  }
});

module.exports = {
  todosRouter: router,
};
