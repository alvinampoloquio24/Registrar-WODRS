module.exports = {
  development: {
    MONGODB_URL: process.env.DEV_MONGODB_URL,
  },
  test: {
    MONGODB_URL: process.env.DEV_MONGODB_URL,
  },
  production: {
    MONGODB_URL: process.env.PROD_MONGODB_URL,
  },
};
