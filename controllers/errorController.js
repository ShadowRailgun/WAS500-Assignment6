const httpStatus = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
  console.log("logging new error!");
  console.error("here it is", error.stack);
  next(error);
};

exports.respondNoResourceFound = (req, res) => {
  let errorCode = httpStatus.StatusCodes.NOT_FOUND;
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`);
};

exports.respondInternalError = (error, req, res, next) => {
  let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};

exports.typeError = (req, res) => {
  let errorCode = httpStatus.StatusCodes.NO_CONTENT;
  res.status(errorCode);
  res.send(`${errorCode} | The page does not exist!`);
};
