class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

handleAnyError = (err, res) => {
  res.send(`handleAnyError: ${err}`);
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};

handleServerError = (err, res) => {
  res.send(`handleServerError: ${err}`);
  res.status(500).json({
    error: { message: `Somthing went wrong with the server 500 ${err}.`}
  })
}

const customErrorHandler = (err, res) => {
  res.send(`customErrorHandler: ${err}`);
  err instanceof ErrorHandler
    ? handleAnyError(err, res)
    : handleServerError(err, res);
}

module.exports = {
  ErrorHandler,
  customErrorHandler,
}
