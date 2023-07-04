// Handle 404 errors (Not Found)
const handle404Error = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
};

// General error handler
const errorHandler = (errStatus, errMessage, res) => {
  
  const status = errStatus || 500;
  const message = errMessage || "Internal Server Error";

  // Send error response to the client
  res.status(status).json({
    error: {
      message: message,
    },
  });
};

export { handle404Error, errorHandler };

// function errorHandler (err, req, res, next) {
//   if (res.headersSent) {
//     return next(err)
//   }
//   res.status(500)
//   res.render('error', { error: err })
// }

// const errorHandlingMiddleware = (err, req, res, next) => {
//   // Log the error or perform any additional error handling/logging here

//   let statusCode = 500;
//   let errorMessage = "Internal Server Error";

//   if (err.statusCode) {
//     statusCode = err.statusCode;
//     errorMessage = err.message;
//   }

//   const errorResponse = {
//     error: {
//       message: errorMessage,
//     },
//   };

//   res.status(statusCode).json(errorResponse);
// };
