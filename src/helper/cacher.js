const { createClient } = require("redis");
const redisConfig = require("../config/redis");
const set = async function (cacheKey, data) {
  try {
    const client = await createClient(redisConfig)
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    // Set the data in the cache
    await client.set(cacheKey, JSON.stringify(data));

    // Set expiration for the cache key (1 hour in seconds)
    await client.expire(cacheKey, 3600);

    await client.disconnect();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
const remove = async function (cacheKey) {
  try {
    const client = await createClient(redisConfig)
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    // Find keys matching a pattern
    const keys = await client.keys(cacheKey);

    // Delete keys
    if (keys.length > 0) {
      await client.del(keys);
    }

    await client.disconnect();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const cache = {
  set,
  remove,
};
module.exports = cache;
