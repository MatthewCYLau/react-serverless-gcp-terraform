const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

let pool;

const getUsersFromDatabase = async (pool) => {
  return await pool
    .select("user_id", "username", "time_created")
    .from("users")
    .orderBy("time_created", "desc");
};

const getUserFromDatabase = async (pool, username) => {
  return await pool("users").where({ username: username });
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
  pool = pool || (await db.createPoolAndEnsureSchema());
  const { username, password } = req.body;
  const timestamp = new Date();

  try {
    const results = await getUserFromDatabase(pool, username);
    if (results.length > 0) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      username,
      password: hashedPassword,
      time_created: timestamp,
    };
    await insertUserToDatabase(pool, user);
    const payload = {
      user: {
        username: user.username,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "superlongjwtsecret",
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ errors: [{ msg: "Error when creating user" }] });
  }
});

router.get("/", async (_req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  pool = pool || (await db.createPoolAndEnsureSchema());

  try {
    const users = await getUsersFromDatabase(pool);
    return res.status(200).send(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Unable to get users");
  }
});

module.exports = {
  usersRouter: router,
};
