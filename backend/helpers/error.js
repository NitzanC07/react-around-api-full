class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

handleAnyError = (err, res) => {
  console.log(`ErrorHandler: ${err}`);
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};

handleServerError = (err, res) => {
  console.log(`ErrorHandler: ${err}`);
  res.status(500).json({
    error: {message: 'Somthing went wrong with the server 500.'}
  })
}

const customErrorHandler = (err, res) => {
  console.log(`ErrorHandler: ${err}`);
  err instanceof ErrorHandler
    ? handleAnyError(err, res)
    : handleServerError(err, res);
}

module.exports = {
  customErrorHandler,
}
