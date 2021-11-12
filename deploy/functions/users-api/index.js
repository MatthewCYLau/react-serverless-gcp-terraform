"use strict";

const express = require("express");
const Knex = require("knex");
const app = express();

app.use(express.json());

const createTcpPool = async (config) => {
  // Extract host and port from socket address
  const dbSocketAddr = process.env.DB_HOST.split(":"); // e.g. '127.0.0.1:5432'

  // Establish a connection to the database
  return Knex({
    client: "pg",
    connection: {
      user: process.env.DB_USER, // e.g. 'my-user'
      password: process.env.DB_PASS, // e.g. 'my-user-password'
      database: process.env.DB_NAME, // e.g. 'my-database'
      host: dbSocketAddr[0], // e.g. '127.0.0.1'
      port: dbSocketAddr[1], // e.g. '5432'
    },
    // ... Specify additional properties here.
    ...config,
  });
};

const createPool = async () => {
  const config = { pool: {} };
  config.pool.max = 5;
  config.pool.min = 5;
  config.pool.acquireTimeoutMillis = 60000;
  config.pool.idleTimeoutMillis = 600000;
  config.pool.createRetryIntervalMillis = 200;
  return createTcpPool(config);
};

const ensureSchema = async (pool) => {
  const hasTable = await pool.schema.hasTable("users");
  if (!hasTable) {
    return pool.schema.createTable("users", (table) => {
      table.increments("user_id").primary();
      table.specificType("username", "VARCHAR(100)").notNullable();
      table.specificType("password", "VARCHAR(100)").notNullable();
      table.timestamp("time_created", 30).notNullable();
    });
  }
};

const createPoolAndEnsureSchema = async () =>
  await createPool()
    .then(async (pool) => {
      await ensureSchema(pool);
      return pool;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

let pool;

app.use(async (_req, _res, next) => {
  if (pool) {
    return next();
  }
  try {
    pool = await createPoolAndEnsureSchema();
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
  const timestamp = new Date();
  const user = {
    username: "foo",
    password: "bar",
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
