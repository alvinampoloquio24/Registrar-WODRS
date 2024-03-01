module.exports = (error, req, res, next) => {
  if (
    error.name === "SequelizeDatabaseError" &&
    error.parent &&
    error.parent.code === "22P02"
  ) {
    error.message = "Invalid ID";
    error.status = 400; // Bad Request status code
  } else if (error.name === "TokenExpiredError") {
    error.message = "Token has expired";
    error.status = 401;
  } else if (error.name === "JsonWebTokenError") {
    error.message = "Invalid token";
    error.status = 400;
  }

  const errMessage = error.message || "Something went wrong";
  const errStatus = error.status || 500;

  console.log(error);
  res.status(errStatus).json({ message: errMessage });

  return next();
};
