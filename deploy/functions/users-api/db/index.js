const Knex = require("knex");

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

module.exports = {
  createPoolAndEnsureSchema,
};
