class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

}

const handleAnyError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};

const handleServerError = (err, res) => {
  res.status(500).json({
    error: {message: 'Somthing went wrong with the server.'}
  })
}

const customErrorHandler = (err, res) => {
  err instanceof ErrorHandler
    ? handleAnyError(err, res)
    : handleServerError(err, res);
}

module.exports = {
  customErrorHandler,
}
