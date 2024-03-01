const { createClient } = require("redis");
const redisConfig = require("../config/redis");

async function cacheMiddleware(req, res, next) {
  const userId = req.params.id;

  try {
    // Create a Redis client
    const client = await createClient(redisConfig)
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    // Save user data

    const userKey = `user:${userId}`; // Create a unique key for the user
    const user = await client.get(userKey);

    if (user) {
      const parse = JSON.parse(user);
      return res.status(401).json({ message: "from redis", parse });
    }

    await client.disconnect();
    next();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = cacheMiddleware;
