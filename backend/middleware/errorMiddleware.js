const CustomError = require("../utils/CustomError");

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.statusCode === 500 ?  "Our servers are lost in space. We'll bring them back soon!" : error.message,
    });
  } else {
    res.status(500).json({
      status: 500,
      message: "Our servers are lost in space. We'll bring them back soon!",
    });
  }
};

const validationErrorHandler = (err, res) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "ValidationError" || err.name === "CastError") err = validationErrorHandler(err);

  if (process.env.NODE_ENV === "development") {
    devErrors(res, err);
  } else if (process.env.NODE_ENV === "production") {
    prodErrors(res, err);
  }
};

module.exports = {
  errorHandler,
};
