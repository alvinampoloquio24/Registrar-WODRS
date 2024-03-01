require("dotenv").config({ path: __dirname + "/../../.env" });

module.exports = {
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDUS_HOST,
    port: process.env.REDIS_PORT,
  },
};
