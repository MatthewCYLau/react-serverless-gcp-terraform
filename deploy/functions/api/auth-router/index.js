const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const auth = require("../middleware/auth");
const router = express.Router();

const getUserWithoutPasswordFromDatabase = async (pool, username) => {
  return await pool
    .from("users")
    .select("user_id", "username", "time_created")
    .where("username", username);
};

const getUserFromDatabase = async (pool, username) => {
  return await pool("users").where({ username: username });
};

let pool;

router.get("/", auth, async (req, res) => {
  try {
    const results = await getUserWithoutPasswordFromDatabase(
      pool,
      req.user.username
    );
    res.json(results[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  pool = pool || (await db.createPoolAndEnsureSchema());
  const { username, password } = req.body;
  try {
    const results = await getUserFromDatabase(pool, username);

    if (!results.length > 0) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, results[0].password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        username: results[0].username,
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
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = {
  authRouter: router,
};
