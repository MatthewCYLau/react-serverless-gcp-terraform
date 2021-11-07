"use strict";

const Knex = require("knex");

let pool;

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
      table.timestamp("time_created", 30).notNullable();
      table.specificType("password", "VARCHAR(100)").notNullable();
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

const insertUserToDatabase = async (pool, user) => {
  try {
    return await pool("users").insert(user);
  } catch (err) {
    throw Error(err);
  }
};

const getUsersFromDatabase = async (pool) => {
  return await pool
    .select("password", "time_created")
    .from("users")
    .orderBy("time_created", "desc")
    .limit(5);
};

exports.getUsers = async (req, res) => {
  pool = pool || (await createPoolAndEnsureSchema());
  try {
    const users = await getUsersFromDatabase(pool);

    res.status(200).send(users).end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to get users").end();
  }
};

exports.createUser = async (req, res) => {
  pool = pool || (await createPoolAndEnsureSchema());
  // Get the team from the request and record the time of the vote.
  const timestamp = new Date();
  const user = {
    password: "foobar",
    time_cast: timestamp,
  };

  // Save the data to the database.
  try {
    await insertUserToDatabase(pool, user);
  } catch (err) {
    console.log("Unable to insert user to database");
    res.status(500).send("Unable to create user").end();
    return;
  }
  res.status(200).send("User created").end();
};
